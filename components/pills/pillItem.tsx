import {defaultSpacing, ThemeContext} from '@/context/themeProvider'
import {FunctionComponent, useContext} from 'react'
import {useRouter} from 'expo-router'
import {StyleSheet, useWindowDimensions, View} from 'react-native'
import StyledText from '@/components/styledText'
import IPill from '@/models/IPill'
import hex2rgba from '@/utils/hex2rgba'
import {FontAwesome5} from '@expo/vector-icons'
import {Button} from '@/components/ui/button'
import { toDateObj } from '@/utils/dateStringToDateObj'
import DayButton from '@/components/pills/daysOfWeek/dayButton'
import IDaysOfWeek from '@/models/IDaysOfWeek'

const daysOfWeek: Array<keyof IDaysOfWeek> = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
]

const PillItem: FunctionComponent<IPill> = props => {
  const {colors, padding} = useContext(ThemeContext)
  const router = useRouter()
  const width = useWindowDimensions().width
  const pill = props

  const date = toDateObj(pill.date)

  return (
    <Button
      style={[
        styles.listItem,
        {backgroundColor: colors.card, borderColor: hex2rgba(colors.border, 0.8)},
        {width: width},
      ]}
      onPress={() => router.push(`/pills/${pill.id}`)}>

      <View style={{flexDirection: 'column', paddingHorizontal: padding.md, height: '100%', flex: 1, justifyContent: 'center'}}>
        <StyledText style={styles.ListItemBodypart}>{pill.name}</StyledText>
        <StyledText style={styles.ListItemComplaint}>{pill.description}</StyledText>
        <View style={{flexDirection: 'row', gap: 4, marginTop: 8}}>
          {daysOfWeek.map(day => (
            <DayButton
              key={day}
              day={day}
              isSelected={!!pill.days?.[day]}
            />
          ))}
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
  ListItemBodypart: {
    fontSize: 22,
  },
  ListItemComplaint: {
    fontSize: 14,
    verticalAlign: 'top',
  },
  listItemDate: {
    fontSize: 14,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  ListItemChevron: {
    fontSize: 20,
    textAlign: 'right',
    marginVertical: 'auto',
  },
})

export default PillItem
