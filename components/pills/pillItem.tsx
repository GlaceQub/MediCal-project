import {cancelPillNotifications} from '@/api/notifications'
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
import {FontAwesome5} from '@expo/vector-icons'
import colorsTW from 'tailwindcss/colors'
import SwipeableListItem from '../custom/swipableListItem'
import {useDeletePill} from '@/api/pills'

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
  const {mutate: deletePill} = useDeletePill()
  const {colors} = useContext(ThemeContext)
  const router = useRouter()
  const width = useWindowDimensions().width
  const pill = props

  const durationText = pill.duration ? `${pill.duration} ${pill.duration === 1 ? 'day' : 'days'}` : 'ongoing'

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
  const isExpired = !pill.notificationIds || pill.notificationIds.length === 0

  const earliestMoment =
    isExpired
      ? 'expired'
      : remainingMoments.length > 0
        ? `${String(remainingMoments[0].getHours()).padStart(2, '0')}:${String(remainingMoments[0].getMinutes()).padStart(2, '0')}`
        : `${String(moments[0].getHours()).padStart(2, '0')}:${String(moments[0].getMinutes()).padStart(2, '0')}`

  const actions = [
    {
      icon: 'pen',
      iconColor: colors.card,
      onPress: () => router.push(`/pills/${pill.id}`),
      bgColor: colorsTW.blue[500],
    },
    {
      icon: 'trash',
      iconColor: colors.card,
      onPress: async () => {
        if (pill.notificationIds?.length) {
          await cancelPillNotifications(pill.notificationIds)
        }
        if (pill.id) deletePill(pill.id)
      },
      bgColor: colorsTW.red[500],
    },
  ]
  return (
    <SwipeableListItem actionButtons={actions}>
      <Button
        style={[
          styles.listItem,
          {backgroundColor: colors.card, borderColor: colorsTW.gray[200]},
          {width: width},
          {borderRadius: 0},
        ]}
        onPress={() => router.push(`/pills/${pill.id}`)}>
        <View style={{flexDirection: 'column', height: '100%', flex: 1, justifyContent: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StyledText style={[styles.ListItemName, {color: colors.text}]}>
              {pill.name}
            </StyledText>
            <StyledText style={[styles.ListItemDuration, {color: hex2rgba(colors.text, 0.6)}]}>
              {durationText}
            </StyledText>
            <StyledText
              style={[
                styles.ListItemEarliestMoment,
                {color: isExpired ? colorsTW.red[500] : hex2rgba(colors.text, 0.6)},
                isExpired && {fontStyle: 'italic'},
              ]}>
              {earliestMoment}
            </StyledText>
          </View>
          <View style={{flexDirection: 'row', gap: 4, marginVertical: 'auto'}}>
            {daysOfWeek.map(day => (
              <DayCircle key={day} day={day} isSelected={!!pill.days?.[day]} />
            ))}
            <FontAwesome5 name="chevron-right" color={hex2rgba(colors.text, 0.6)} style={styles.ListItemChevron} />
          </View>
        </View>
      </Button>
    </SwipeableListItem>
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
