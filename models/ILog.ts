
interface ILog {
  id?: string, 
  bodypart: string, // name of the bodypart where the complaint is located
  complaint: string, // description of the complaint
  extraInformation: string | null, // extra information about the complaint
  pain: number, // value between 1 and 10 inclusive
  date: Date,
  userId?: string // 
}

export default ILog