import { getDayType } from "../utils/dayTypes";
import { NORMAL_LIMITS } from "../config/workingRules";

export default function DaySummary({ date, isHoliday, shiftType }) {
  const dayType = getDayType(date, isHoliday);

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded text-gray-300">
      <p><strong>Day:</strong> {dayType}</p>
      <p><strong>Shift:</strong> {shiftType}</p>
      <p><strong>Normal hours:</strong> {NORMAL_LIMITS[dayType]} hrs</p>
      <p className="text-gray-400 text-sm mt-2">
        30-minute break deducted automatically
      </p>
    </div>
  );
}
