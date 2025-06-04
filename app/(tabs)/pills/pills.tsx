import Filter from '@/components/filter'
import PillList from '@/components/pills/pillList'
import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent, useState} from 'react'

const Pills: FunctionComponent = () => {
  const [filter, setFilter] = useState<string | null>(null)

  return (
    <>
      <TabsBar />
      <Filter itemType='pills' onFilterChange={setFilter} />
      <PillList filter={filter}/> 
    </>
  )
}

export default Pills