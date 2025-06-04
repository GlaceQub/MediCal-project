import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent} from 'react'
import Filter from '@/components/filter'
import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'

const Pills: FunctionComponent = () => {
  return (
    <>
      <TabsBar />
      <Filter itemType={'pills'} />
    </>
  )
}

export default Pills