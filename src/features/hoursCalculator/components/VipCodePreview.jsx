import { getDayType } from "../utils/dayType";
import { VIP_CODES } from "../config/vipCodes";
import { NORMAL_LIMITS } from "../config/workingRules";

export default function VipCodePreview({ date, isHoliday, shiftType }) {
  const dayType = getDayType(date, isHoliday);
  const rules = VIP_CODES[dayType][shiftType];

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded text-gray-300">
      <h3 className="font-semibold text-gray-100">VIP Codes</h3>

      {rules.all ? (
        <p>All hours → Code {rules.all.code}</p>
      ) : (
        <>
          <p>Normal (≤ {NORMAL_LIMITS[dayType]} hrs) → Code {rules.normal.code}</p>
          <p>Overtime → Code {rules.overtime.code}</p>
        </>
      )}
    </div>
  );
}
