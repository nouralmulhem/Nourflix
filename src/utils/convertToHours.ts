export function convertMinutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const fractionalHours = (minutes % 60) / 60;
  const totalHours = hours + fractionalHours;

  return totalHours.toFixed(2);
}
