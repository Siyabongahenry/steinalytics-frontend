export default function CalculationSteps({ steps }) {
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={i} className="bg-gray-800 border border-gray-700 p-3 rounded">
          <strong className="text-gray-100">{s.title}</strong>
          <p className="text-gray-400 text-sm">{s.description}</p>
          <p className="text-gray-200">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
