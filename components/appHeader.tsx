import {FunctionComponent, useContext} from 'react'
import AppTitle from '@/components/appTitle'
import {FontAwesome5} from '@expo/vector-icons'
import {ThemeContext} from '@/context/themeProvider'
import {View} from 'react-native'
import StyledText from './styledText'
import { StyleSheet } from 'react-native'

const AppHeader: FunctionComponent = () => {
  const {colors, padding} = useContext(ThemeContext)

  const userName = 'David' // Replace with actual user name from context or props
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: padding.md}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <AppTitle>Medi+Cal</AppTitle>
      </View>
      <View style={{flexDirection: 'row', position: 'absolute', right: 10, height: styles.userIcon.height}}>
        <StyledText style={{color: colors.text, fontSize: 14, paddingRight: padding.sm, verticalAlign:'middle'}}>{userName}</StyledText>
        <View style={[{backgroundColor: colors.text, padding: padding.sm}, styles.userIcon]}>
          <FontAwesome5 name="user" size={24} color={colors.background}/>
        </View>
      </View>
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
  userIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 999, // Large value for a perfect circle
  },
})
