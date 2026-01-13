import { getDayType } from "../utils/dayType";

export default function VipCodeExplanation({ booking, date, isHoliday, shiftType }) {
  const dayType = getDayType(date, isHoliday);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded p-4 space-y-2">
      <h4 className="text-gray-100 font-semibold">
        Why Code {booking.code} Was Used
      </h4>

      <p className="text-gray-300">
        <strong>Booked hours:</strong>{" "}
        {booking.hours.toFixed(2)} hours
      </p>

      <p className="text-gray-300">
        <strong>Reason:</strong>{" "}
        {booking.reason}
      </p>

      <p className="text-gray-400 text-sm">
        This code applies because the employee worked a{" "}
        <strong>{shiftType === "DAY" ? "day" : "night"}</strong> shift on a{" "}
        <strong>{humanDayType(dayType)}</strong>.
      </p>

      {isOvertimeCode(booking.code) && (
        <p className="text-amber-400 text-sm">
          These hours exceed the company’s normal working hours and are therefore
          treated as overtime.
        </p>
      )}

      {dayType === "SUNDAY" && (
        <p className="text-orange-400 text-sm">
          Sunday VIP codes always apply, even if the day is a public holiday.
        </p>
      )}
    </div>
  );
}

/* helpers */

function humanDayType(dayType) {
  switch (dayType) {
    case "WEEKDAY":
      return "weekday (Monday to Thursday)";
    case "FRIDAY":
      return "Friday";
    case "SATURDAY":
      return "Saturday";
    case "SUNDAY":
      return "Sunday";
    case "HOLIDAY":
      return "public holiday";
    default:
      return dayType;
  }
}

function isOvertimeCode(code) {
  return [
    601, 602, 604,
    801, 802, 804,
  ].includes(code);
}
