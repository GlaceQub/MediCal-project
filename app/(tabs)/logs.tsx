import LogItem from '@/components/logs/logItem'
import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent} from 'react'

const Logs: FunctionComponent = () => {
  return (
    <>
      <TabsBar />
      <LogItem />
    </>
  )
}

export default Logs