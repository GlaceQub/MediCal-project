import IDaysOfWeek from './IDaysOfWeek'

interface IPill {
  id: string,
  name: string, // name of the pill
  description: string, // description of the pill
  duration?: number, // in days
  moment?: Date | string, // time of intake or custom remark (for example: "before breakfast")
  days: IDaysOfWeek // days of the week when the pill should be taken
}

export default IPill