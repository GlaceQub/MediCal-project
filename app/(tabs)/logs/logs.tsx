import Filter from '@/components/filter'
import LogList from '@/components/logs/logList'
import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent} from 'react'

const Logs: FunctionComponent = () => {
  const filterValue = null // This can be set to a specific bodypart or complaint to filter logs

  return (
    <>
      <TabsBar />
      <Filter itemType={'logs'} />
      <LogList filter={filterValue}/>
    </>
  )
}

export default Logs