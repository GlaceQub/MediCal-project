import {defaultSpacing, ThemeContext} from '@/context/themeProvider'
import {FunctionComponent, useContext} from 'react'
import {useRouter} from 'expo-router'
import {StyleSheet, useWindowDimensions, View} from 'react-native'
import PainIndicator from './painIndicator'
import StyledText from '@/components/styledText'
import ILog from '@/models/ILog'
import hex2rgba from '@/utils/hex2rgba'
import {FontAwesome5} from '@expo/vector-icons'
import {Button} from '../ui/button'
import {toDateObj} from '@/utils/dateStringToDateObj'
import SwipeableListItem from '@/components/custom/swipableListItem'
import { useDeleteLog } from '@/api/logs'
import colorsTW from 'tailwindcss/colors'


const LogItem: FunctionComponent<ILog> = props => {
  const {mutate: deleteLog} = useDeleteLog()

  const {colors, padding} = useContext(ThemeContext)
  const router = useRouter()
  const width = useWindowDimensions().width
  const log = props

  const date = toDateObj(log.date)

  const actions = [
    {
      icon: "pen",
      iconColor: colors.card,
      onPress: () => router.push(`/logs/${log.id}`),
      bgColor: colorsTW.blue[500],
    },
    {
      icon: "trash",
      iconColor: colors.card,
      onPress: () => { if (log.id) deleteLog(log.id) },
      bgColor: colorsTW.red[500],
    }
  ]

  return (
    <SwipeableListItem actionButtons={actions}>
      <Button
        style={[
          styles.listItem,
          {backgroundColor: colors.card, borderColor: colorsTW.gray[200]},
          {width: width},
          {borderRadius: 0}
        ]}
        onPress={() => router.push(`/logs/${log.id}`)}>
        <PainIndicator pain={log.pain} />
        <View style={{flexDirection: 'row', paddingLeft: padding.md, height: '100%', flex: 1}}>
          <View style={[{flexDirection: 'column'}, {width: 0.55 * width}]}>
            <StyledText style={[{color: colors.text}, styles.ListItemBodypart]}>{log.bodypart}</StyledText>
            <StyledText style={[{color: hex2rgba(colors.text, 0.6)}, styles.ListItemComplaint]}>
              {log.complaint}
            </StyledText>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end', flex: 1}}>
            <StyledText style={[{color: hex2rgba(colors.text, 0.6)}, styles.listItemDate]}>
              {date.toLocaleDateString('en-GB')}
            </StyledText>
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

export default LogItem
