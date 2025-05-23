import {Link} from 'expo-router'
import React, {FunctionComponent, useContext} from 'react'
import {View} from 'react-native'
import StyledTitle from './styledTitle'
import {useRoute} from '@react-navigation/native'
import {ThemeContext} from '@/context/themeProvider'
import {StyleSheet} from 'react-native'
import StyledTabItem from './styledTabItem'

const TabsBar: FunctionComponent = () => {
  const route = useRoute()
  const {colors, margin, padding} = useContext(ThemeContext)
  return (
    <View style={[styles.linkContainer]}>
      <StyledTabItem href="/(tabs)/logs" icon="book-medical" isActive={route.name === 'logs'}>
        Logboek
      </StyledTabItem>
      <StyledTabItem href="/(tabs)/pills" icon="pills" isActive={route.name === 'pills'}>
        Medicatie
      </StyledTabItem>
      <StyledTabItem href="/(tabs)/profile" icon="portrait" isActive={route.name === 'profile'}>
        Profiel
      </StyledTabItem>
    </View>
  )
}

export default TabsBar

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
