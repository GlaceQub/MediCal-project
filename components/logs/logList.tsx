import {FunctionComponent} from 'react'
import { useWindowDimensions } from 'react-native'
import {FlashList} from '@shopify/flash-list'
import ILogs from '@/models/ILog'
import LogItem from './logItem'
import { useRoute } from '@react-navigation/native'

interface LogListProps {
  filter: string | null // Optional filter prop to filter logs based on a bodypart or comlaint
}

const LogList: FunctionComponent<LogListProps> = ({ filter }) => {
  const logs: ILogs[] = [] // This should be replaced with actual log data
  const filteredLogs = logs.filter(log => filter === null ? true : log.bodypart.includes(filter) || log.complaint.includes(filter))
  const route = useRoute()
  const {width} = useWindowDimensions()
  
  return (
    <>
      <FlashList
        data={filteredLogs}
        renderItem={log => <LogItem {...log.item} />}
        keyExtractor={log => log.id}
        estimatedItemSize={100}
        estimatedListSize={{height: 100 * 10, width}}
      />
    </>
  )
}

export default LogList