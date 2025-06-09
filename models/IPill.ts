import IDaysOfWeek from './IDaysOfWeek'

interface IPill {
  id?: string,
  name: string, // name of the pill
  description: string, // description of the pill
  duration?: number, // in days
  date: Date, // start date for the pill
  moments: {hour: number, minute: number}[], // time(s) of intake
  days: IDaysOfWeek // days of the week when the pill should be taken
  userId?: string // user ID of the person who created the pill
  imageUrl?: string // URL of the pill image
  notificationIds?: string[] // IDs of scheduled notifications for this pill
}

export default IPill