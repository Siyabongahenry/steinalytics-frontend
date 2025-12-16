// utils/chartUtils.js

export function transformDataForMultiLineChart(data, metric = "employees_count", selectedSites = []) {
  if (!data || data.length === 0) return [];

  // Step 1: get unique dates
  const uniqueDates = [...new Set(data.map(item => item.date))].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Step 2: get all sites if none selected
  const siteKeys = selectedSites.length > 0 
    ? selectedSites 
    : [...new Set(data.map(item => item.site))];

  // Step 3: build chart data
  return uniqueDates.map(date => {
    const row = { date };
    siteKeys.forEach(site => {
      const record = data.find(item => item.date === date && item.site === site);
      row[site] = record ? record[metric] : 0;
    });
    return row;
  });
}
