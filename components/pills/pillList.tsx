import {FunctionComponent} from 'react'
import {useWindowDimensions, View} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import PillItem from './pillItem'
import {useGetPills} from '@/api/pills'
import colors from 'tailwindcss/colors'
import { Spinner } from '@/components/ui/spinner'
import StyledText from '../styledText'
import StyledTitle from '../styledTitle'

interface PillListProps {
  filter: string | null // Optional filter prop to filter logs based on a bodypart or comlaint
}

const PillList: FunctionComponent<PillListProps> = ({filter}) => {
  const {data: pills = [], isLoading, error} = useGetPills()
  const {width} = useWindowDimensions()
  
  const filteredPills = filter
    ? pills.filter(
        pill =>
          pill.name.toLowerCase().includes(filter.toLowerCase()) ||
          pill.description.toLowerCase().includes(filter.toLowerCase())
      )
    : pills

      
  if (isLoading) { return <Spinner size="large" color={colors.red[500]} style={{marginTop: 20}}/> }
  if (error) { 
    console.log('error: ', error.message)
    return <View style={{marginHorizontal: 'auto', marginTop: 20}}><StyledText>Error loading medication: look in dev console for more information</StyledText></View> }
  if (filteredPills.length === 0) { return <StyledTitle style={{marginHorizontal: 'auto', marginTop: 20}}>No medication found</StyledTitle> }


  return (
    <>
      <FlashList
        data={filteredPills}
        renderItem={({item}) => <PillItem {...item} />}
        keyExtractor={(pill, index) => pill.id ?? index.toString()}
        estimatedItemSize={100}
        estimatedListSize={{height: 100 * 10, width}}
      />
    </>
  )
}

export default PillList
