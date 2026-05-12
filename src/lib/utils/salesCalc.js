export const calculatePredictedSales = (salesData) => {
  if (!salesData || salesData.length === 0) return null;
  const data = salesData.map(s => ({ date: s.date, amount: Number(s.dailySales) }));
  const recent = data.slice(-7);
  const average = recent.reduce((sum, d) => sum + d.amount, 0) / recent.length;
  const last = data.at(-1)?.amount ?? 0;
  const prev = data.length >= 7 ? data.at(-7)?.amount ?? 0 : data.at(0)?.amount ?? 0;
  const trend = last > prev ? '상승' : '하락';

  return {
    predictedAmount: Math.round(average),
    trend,
    recentAverage: Math.round(average),
    maxAmount: Math.max(...data.map(d => d.amount)),
    minAmount: Math.min(...data.map(d => d.amount)),
  };
};
