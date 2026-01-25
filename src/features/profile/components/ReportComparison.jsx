import { useMemo } from "react";
import { FaTimes } from "react-icons/fa";

export default function ReportComparison({ reports, onClose }) {
  // Hooks must run first
  const metricNames = useMemo(() => {
    if (!reports || reports.length < 2 || !reports[0].metrics) return [];
    return Object.keys(reports[0].metrics);
  }, [reports]);

  const averages = useMemo(() => {
    if (!metricNames.length) return {};
    const result = {};
    metricNames.forEach((metric) => {
      const total = reports.reduce((sum, r) => sum + (r.metrics[metric] || 0), 0);
      result[metric] = total / reports.length;
    });
    return result;
  }, [reports, metricNames]);

  const changes = useMemo(() => {
    if (!metricNames.length) return [];
    const first = reports[0].metrics;
    return reports.map((r) => {
      const diff = {};
      metricNames.forEach((metric) => {
        diff[metric] = (r.metrics[metric] || 0) - (first[metric] || 0);
      });
      return diff;
    });
  }, [reports, metricNames]);

  // Early return AFTER hooks
  if (!reports || reports.length < 2) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-4xl overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Compare Reports</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <FaTimes />
          </button>
        </div>

        <table className="min-w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Metric</th>
              {reports.map((r) => (
                <th key={r.id} className="px-4 py-2 text-left">
                  {r.name}
                </th>
              ))}
              <th className="px-4 py-2 text-left">Average</th>
            </tr>
          </thead>
          <tbody>
            {metricNames.map((metric) => (
              <tr key={metric} className="border-t border-gray-700">
                <td className="px-4 py-2 font-medium">{metric}</td>
                {reports.map((r, i) => {
                  const value = r.metrics[metric] || 0;
                  const change = changes[i][metric];
                  return (
                    <td key={r.id} className="px-4 py-2">
                      {value}{" "}
                      {change > 0 ? (
                        <span className="text-green-400">↑{change}</span>
                      ) : change < 0 ? (
                        <span className="text-red-400">↓{Math.abs(change)}</span>
                      ) : null}
                    </td>
                  );
                })}
                <td className="px-4 py-2">{averages[metric].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
