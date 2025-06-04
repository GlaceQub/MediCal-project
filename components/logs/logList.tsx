import {FunctionComponent} from 'react'
import {useWindowDimensions, View} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import LogItem from './logItem'
import {useGetLogs} from '@/api/logs'
import colors from 'tailwindcss/colors'
import { Spinner } from '@/components/ui/spinner'
import StyledText from '../styledText'
import StyledTitle from '../styledTitle'

interface LogListProps {
  filter: string | null // Optional filter prop to filter logs based on a bodypart or comlaint
}

const LogList: FunctionComponent<LogListProps> = ({filter}) => {
  const {data: logs = [], isLoading, error} = useGetLogs()
  const {width} = useWindowDimensions()
  
  const filteredLogs = filter
    ? logs.filter(
        log =>
          log.bodypart.toLowerCase().includes(filter.toLowerCase()) ||
          log.complaint.toLowerCase().includes(filter.toLowerCase())
      )
    : logs

      
  if (isLoading) { return <Spinner size="large" color={colors.red[500]} style={{marginTop: 20}}/> }
  if (error) { 
    console.log('error: ', error.message)
    return <View style={{marginHorizontal: 'auto', marginTop: 20}}><StyledText>Error loading logs: look in dev console for more information</StyledText></View> }
  if (filteredLogs.length === 0) { return <StyledTitle style={{marginHorizontal: 'auto', marginTop: 20}}>No logs found</StyledTitle> }


  return (
    <>
      <FlashList
        data={filteredLogs}
        renderItem={({item}) => <LogItem {...item} />}
        keyExtractor={(log, index) => log.id ?? index.toString()}
        estimatedItemSize={100}
        estimatedListSize={{height: 100 * 10, width}}
      />
    </>
  )
}

export default LogList
