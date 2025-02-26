export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

export const formatToLocalDate = (isoString?: string) => {
  if (!isoString) return 'Invalid date';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(date);
};
