import LogList from '@/components/logs/logList'
import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent} from 'react'

const Logs: FunctionComponent = () => {
  return (
    <>
      <TabsBar />
      <LogList />
    </>
  )
}

export default Logs