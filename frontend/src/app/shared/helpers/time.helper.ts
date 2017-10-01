export function getFormatedTime(ts: {
  hours: number;
  minutes: number;
  seconds: number;
}): string {
  // if hours, minutes or seconds are < 10 add a 0 before
  const hours = ('0' + ts.hours).toString().slice(-2);
  const minutes = ('0' + ts.minutes).toString().slice(-2);
  const seconds = ('0' + ts.seconds).toString().slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}
