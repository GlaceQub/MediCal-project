export function toDateObj(date: any): Date {
  if (!date) return new Date()
  if (date instanceof Date) return date
  if (typeof date.toDate === 'function') return date.toDate() // Firestore Timestamp
  return new Date(date) // ISO string or number
}