import Filter from '@/components/filter'
import LogList from '@/components/logs/logList'
import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent, useState} from 'react'

const Logs: FunctionComponent = () => {
  const [filter, setFilter] = useState<string | null>(null)

  return (
    <>
      <TabsBar />
      <Filter itemType='logs' onFilterChange={setFilter} />
      <LogList filter={filter}/> 
    </>
  )
}

export default Logs