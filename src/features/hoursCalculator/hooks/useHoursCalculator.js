// hooks/useHoursCalculator.js
import { useState } from "react";
import { calculateWithExplanation } from "../utils/calculateHours";

export function useHoursCalculator() {
  const [result, setResult] = useState(null);

  function calculate(entry) {
    setResult(calculateWithExplanation(entry));
  }

  return { result, calculate };
}
