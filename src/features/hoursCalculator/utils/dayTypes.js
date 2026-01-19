// utils/dayType.js
export function getDayType(date, isHoliday) {
  const day = date.getDay(); // 0 = Sunday

  if (day === 0) return "SUNDAY";
  if (day === 6) return "SATURDAY";
  if (isHoliday) return "HOLIDAY";
  if (day === 5) return "FRIDAY";

  return "WEEKDAY";
}
