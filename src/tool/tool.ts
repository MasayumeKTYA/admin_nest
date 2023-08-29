function formatDate(date: Date): string {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function getYesterdayAnd7YearsAgo(): string[] {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenYearsAgo = new Date(today);
  sevenYearsAgo.setDate(today.getDate() - 7);
  return [formatDate(yesterday), formatDate(sevenYearsAgo)];
}
export function getLastMonthAnd6MonthsAgo(): string[] {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  lastMonth.setDate(1);
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  return [formatDate(lastMonth), formatDate(sixMonthsAgo)];
}


