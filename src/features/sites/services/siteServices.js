import axios from "axios";

const USE_MOCK = true; // toggle for backend vs mock

export async function getSiteSummary({ sites = [], startDate, endDate, aggregate }) {

   if (USE_MOCK) {
      return getMockEskomWorkforceData();
    } 
    else {
      try {
        const params = {
          sites: sites.join(","), // comma-separated
          start: startDate,
          end: endDate,
          aggregate, // daily or weekly
        };
        const response = await axios.get("/api/sites-summary", { params });
        return response.data; // expected format: [{date, site, employees_count, productive_hours, ...}, ...]
      } catch (error) {
        console.error("Error fetching site summary:", error);
        return [];
      }
    }
}



function getMockEskomWorkforceData() {
  const result = [];

  // Baseline ranges per site
  const sites = [
    { site: "Tutuka", base: 200 },
    { site: "Kriel", base: 1000 },
    { site: "Duvha", base: 800 },
    { site: "Matla", base: 300 },
    { site: "Majuba", base: 500 },
    { site: "Kusile", base: 300 },
    { site: "Kendal", base: 480 }
  ];

  for (let day = 1; day <= 30; day++) {
    const date = `2025-11-${String(day).padStart(2, "0")}`;
    const jsDate = new Date(date);
    const dayOfWeek = jsDate.getDay(); // 0=Sun, 6=Sat

    sites.forEach(({ site, base }) => {
      // Random daily fluctuation: ±40% of base
      let fluctuation = Math.floor((Math.random() - 0.5) * base * 0.8);

      // Weekend adjustment
      let weekendAdjustment = 0;
      if (dayOfWeek === 6) weekendAdjustment = -Math.floor(base * 0.25); // Sat drop
      if (dayOfWeek === 0) weekendAdjustment = -Math.floor(base * 0.35); // Sun drop
      if (dayOfWeek === 1) weekendAdjustment = Math.floor(base * 0.15);  // Mon spike

      // Final employee count
      const employeesCount = Math.max(
        50,
        base + fluctuation + weekendAdjustment
      );

      result.push({
        site,
        date,
        employees_count: employeesCount,
        total_hours_worked: employeesCount * 8, // assume 8h shifts
        productive_hours: Math.floor(employeesCount * 6.5), // ~80% productive
        non_productive_hours: Math.floor(employeesCount * 1.5),
        normal_hours: Math.floor(employeesCount * 7),
        overtime_hours: Math.floor(Math.random() * 50) // random overtime
      });
    });
  }

  return result;
}
