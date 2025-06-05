export default function getDayAbbreviation(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1, 3)
}