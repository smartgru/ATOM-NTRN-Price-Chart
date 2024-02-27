export const calcAverage = (data) => {
  if (!data || !data.length) return 0;
  const sum = data.reduce((acc, cur) => acc + cur.value, 0);
  return Number((sum / data.length).toFixed(2));
};
