// utils/calculateHours.js
import { BREAK_HOURS, NORMAL_LIMITS } from "../config/workingRules";
import { VIP_CODES } from "../config/vipCodes";
import {getDayType} from "./dayTypes"

export function calculateWithExplanation({
  date,
  startTime,
  endTime,
  shiftType,
  isHoliday,
}) {
  const steps = [];
  const bookings = [];

  // Raw hours
  const rawHours = timeDiff(startTime, endTime);
  steps.push({
    title: "Raw hours worked",
    description: "Time between start and end time",
    value: `${rawHours.toFixed(2)} hours`,
  });

  // Break
  const totalHours = Math.max(rawHours - BREAK_HOURS, 0);
  steps.push({
    title: "Break deduction",
    description: "A 30-minute break is deducted every day",
    value: `-0.50 hours`,
  });

  steps.push({
    title: "Paid hours",
    description: "Total payable hours after break",
    value: `${totalHours.toFixed(2)} hours`,
  });

  const dayType = getDayType(date, isHoliday);
  const rules = VIP_CODES[dayType][shiftType];

  // Weekend shortcut
  if (rules.all) {
    bookings.push({
      code: rules.all.code,
      hours: totalHours,
      reason: rules.all.label,
    });
    return { steps, bookings };
  }

  const normalLimit = NORMAL_LIMITS[dayType];
  const normalHours = Math.min(totalHours, normalLimit);
  const overtimeHours = Math.max(totalHours - normalLimit, 0);

  steps.push({
    title: "Normal hours limit",
    description: `Company standard for ${dayType.toLowerCase()}`,
    value: `${normalLimit} hours`,
  });

  if (normalHours > 0) {
    bookings.push({
      code: rules.normal.code,
      hours: normalHours,
      reason: rules.normal.label,
    });
  }

  if (overtimeHours > 0) {
    bookings.push({
      code: rules.overtime.code,
      hours: overtimeHours,
      reason: rules.overtime.label,
    });
  }

  return { steps, bookings };
}

// helper
function timeDiff(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  let startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;

  // overnight shift support
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }

  return (endMinutes - startMinutes) / 60;
}
