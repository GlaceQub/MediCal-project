import {defaultSpacing, ThemeContext} from '@/context/themeProvider'
import {FunctionComponent, useContext} from 'react'
import {useRouter} from 'expo-router'
import {StyleSheet, useWindowDimensions, View} from 'react-native'
import PainIndicator from './painIndicator'
import StyledText from '@/components/styledText'
import ILog from '@/models/ILog'
import hex2rgba from '@/utils/hex2rgba'
import { FontAwesome5 } from '@expo/vector-icons'

const LogItem: FunctionComponent<ILog> = () => {
  const {colors, padding,} = useContext(ThemeContext)
  const router = useRouter()
  const width = useWindowDimensions().width

  const log: ILog = {
    bodypart: 'Hoofd',
    pain: 5,
    date: new Date(),
    id: '1',
    complaint: 'test complaint lorum test test lorum test test',
  } // Example log item

  return (
    <View style={[styles.listItem, {backgroundColor: colors.card, borderColor: hex2rgba(colors.border, 0.8)}, {width: width}]}>
      <PainIndicator pain={log.pain} />
      <View style={{flexDirection: 'row', paddingHorizontal: padding.md}}>
        <View style={[{flexDirection: 'column'}, {width: 0.6 * width}]}>
          <StyledText style={[{color: colors.text}, styles.ListItemBodypart]}>{log.bodypart}</StyledText>
          <StyledText style={[{color: hex2rgba(colors.text, 0.6)}, styles.ListItemComplaint]}>
            {log.complaint}
          </StyledText>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-end', flex: 1}}>
          <StyledText style={[{color: hex2rgba(colors.text, 0.6)}, styles.listItemDate]}>
            {log.date.toLocaleDateString("en-GB")}
          </StyledText>
          <FontAwesome5 name="chevron-right" color={hex2rgba(colors.text, 0.6)} style={styles.ListItemChevron} />
        </View>
      </View>
    </View>
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
    fontSize: 22
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
    marginVertical: "auto"
  }
})

export default LogItem
