export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

// export const formatToLocalDate = (isoString?: string) => {
//   if (!isoString) return 'Invalid date';

//   const date = new Date(isoString);
//   if (isNaN(date.getTime())) return 'Invalid date';

//   return new Intl.DateTimeFormat('id-ID', {
//     dateStyle: 'long',
//   }).format(date);
// };

export const formatToLocalDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const getTimeAgo = (date: string) => {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 1000
  );

  if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
  return formatToLocalDate(date);
};
