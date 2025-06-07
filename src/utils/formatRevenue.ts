export function formatRevenueData(totalRevenue: { [key: string]: number }) {
  return Object.entries(totalRevenue).map(([month, revenue]) => ({
    month: month.replace('Th 0', 'Th ').replace('Th0', 'Th ').trim(),
    revenue: revenue
  }))
}
