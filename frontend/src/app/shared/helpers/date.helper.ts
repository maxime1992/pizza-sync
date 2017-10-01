// adapted from this stackoverflow answer https://stackoverflow.com/a/3552493/2398593
export function getCurrentDateFormatted() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${monthNames[monthIndex]}-${year}`;
}
