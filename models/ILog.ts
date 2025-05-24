import IBodypart from './IBodypart'

interface ILog {
  id: string, 
  bodypart: IBodypart, // name of the bodypart where the complaint is located
  complaint: string, // description of the complaint
  extraInformation?: string, // extra information about the complaint
  pain: number, // value between 1 and 10 inclusive
  date: string,
}

export default ILog