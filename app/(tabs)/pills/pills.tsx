import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent} from 'react'
import Filter from '@/components/filter'

const Pills: FunctionComponent = () => {
  return (
    <>
      <TabsBar />
      <Filter itemType={'pills'} />
    </>
  )
}

export default Pills