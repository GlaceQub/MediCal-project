import {defaultSpacing, ThemeContext} from '@/context/themeProvider'
import {FunctionComponent, useContext} from 'react'
import {useRouter} from 'expo-router'
import {StyleSheet, useWindowDimensions, View} from 'react-native'
import StyledText from '@/components/styledText'
import IPill from '@/models/IPill'
import hex2rgba from '@/utils/hex2rgba'
import {Button} from '@/components/ui/button'
import {toDateObj} from '@/utils/dateStringToDateObj'
import DayCircle from '@/components/pills/daysOfWeek/dayCircle'
import IDaysOfWeek from '@/models/IDaysOfWeek'
import { FontAwesome5 } from '@expo/vector-icons'

const daysOfWeek: Array<keyof IDaysOfWeek> = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const PillItem: FunctionComponent<IPill> = props => {
  const {colors, padding} = useContext(ThemeContext)
  const router = useRouter()
  const width = useWindowDimensions().width
  const pill = props
  const date = toDateObj(pill.date)
  
  const durationText = pill.duration
    ? `${pill.duration} ${pill.duration === 1 ? 'day' : 'days'}`
    : 'ongoing'

  // Find the earliest next moment after now
  const now = new Date()
  const moments = (pill.moments ?? [])
    .map(m => {
      const moment = new Date()
      moment.setHours(m.hour, m.minute, 0, 0)
      return moment
    })
    .sort((a, b) => a.getTime() - b.getTime())
  const remainingMoments = moments.filter(m => m > now)
  const earliestMoment = remainingMoments.length > 0
    ? `${String(remainingMoments[0].getHours()).padStart(2, '0')}:${String(remainingMoments[0].getMinutes()).padStart(2, '0')}`
    : `${String(moments[0].getHours()).padStart(2, '0')}:${String(moments[0].getMinutes()).padStart(2, '0')}`

  return (
    <Button
      style={[
        styles.listItem,
        {backgroundColor: colors.card, borderColor: hex2rgba(colors.border, 0.8)},
        {width: width},
      ]}
      onPress={() => router.push(`/pills/${pill.id}`)}>
      <View style={{flexDirection: 'column', height: '100%', flex: 1, justifyContent: 'flex-start'}}>
        <View style={{flexDirection: 'row'}}>
          <StyledText style={[styles.ListItemName, {color: colors.text}]}>{pill.name}</StyledText>
          <StyledText style={[styles.ListItemDuration, {color: hex2rgba(colors.text, 0.6)}]}>{durationText}</StyledText>
          <StyledText style={[styles.ListItemEarliestMoment, {color: hex2rgba(colors.text, 0.6)}]}>{earliestMoment}</StyledText>
        </View>
        <View style={{flexDirection: 'row', gap: 4, marginVertical: 'auto'}}>
          {daysOfWeek.map(day => (
            <DayCircle key={day} day={day} isSelected={!!pill.days?.[day]} />
          ))}
          <FontAwesome5 name="chevron-right" color={hex2rgba(colors.text, 0.6)} style={styles.ListItemChevron} />
        </View>
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: defaultSpacing.padding.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  ListItemName: {
    fontSize: 22,
    flex: 1,
  },
  ListItemDuration: {
    width: 70,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ListItemEarliestMoment: {
    width: 60,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    
  },
  ListItemChevron: {
    fontSize: 20,
    textAlign: 'right',
    marginVertical: 'auto',
    marginLeft: 'auto',
  },
})

export default PillItem
