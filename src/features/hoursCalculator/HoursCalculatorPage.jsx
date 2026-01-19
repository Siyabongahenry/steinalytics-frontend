import { useState } from "react";
import { useHoursCalculator } from "./hooks/useHoursCalculator";
import TimeInputs from "./components/TimeInputs";
import ShiftSelector from "./components/ShiftSelector";
import DaySummary from "./components/DaySummary";
import VipCodePreview from "./components/VipCodePreview";
import CalculationSteps from "./components/CalculationSteps";
import ResultTable from "./components/ResultTable";

export default function HoursCalculatorPage() {
  const { result, calculate } = useHoursCalculator();

  const [form, setForm] = useState({
    date: new Date(),
    startTime: "",
    endTime: "",
    shiftType: "DAY",
    isHoliday: false,
  });

  function update(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="bg-gray-900 text-gray-100 p-6 space-y-4">
      <h1 className="text-xl font-bold">Working Hours Calculator</h1>

      <TimeInputs form={form} onChange={update} />
      <ShiftSelector value={form.shiftType} onChange={update} />

      <label className="flex gap-2 items-center text-gray-400">
        <input
          type="checkbox"
          checked={form.isHoliday}
          onChange={(e) => update("isHoliday", e.target.checked)}
        />
        Public Holiday
      </label>

      <DaySummary {...form} />
      <VipCodePreview {...form} />

      <button
        onClick={() => calculate(form)}
        className="bg-gray-100 text-gray-900 px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result && (
        <>
          <CalculationSteps steps={result.steps} />
          <ResultTable bookings={result.bookings} />
        </>
      )}
    </div>
  );
}
