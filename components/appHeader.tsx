import {FunctionComponent, useContext} from 'react'
import AppTitle from '@/components/appTitle'
import {FontAwesome5} from '@expo/vector-icons'
import {ThemeContext} from '@/context/themeProvider'
import {View} from 'react-native'
import StyledText from './styledText'
import {StyleSheet} from 'react-native'
import useUser from '@/hooks/useUser'
import {Image as ImageRN} from 'react-native'

const AppHeader: FunctionComponent = () => {
  const {colors, margin, padding} = useContext(ThemeContext)
  const user = useUser()

  const userName = user ? user.displayName : 'guest'

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: padding.md,
        justifyContent: 'space-between',
        height: 64,
        marginBottom: margin.sm
      }}>
      <ImageRN
        source={require('@/assets/images/app-icon-text-full.png')}
        alt="app-icon"
        style={{width: 100, resizeMode: 'contain'}}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <StyledText
          style={{
            color: colors.text,
            fontSize: 14,
            paddingRight: padding.sm,
            verticalAlign: 'middle',
            textAlign: 'right',
            width: 200,
          }}>
          {userName}
        </StyledText>
        <View style={[{backgroundColor: colors.text, padding: padding.sm}, styles.userIcon]}>
          <FontAwesome5 name="user" size={24} color={colors.background} />
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
    width: 32,
    height: 32,
    borderRadius: 999, // Large value for a perfect circle
  },
})
