import React, {FunctionComponent, useContext} from 'react'
import {View} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {StyleSheet} from 'react-native'
import StyledTabItem from './styledTabItem'

const TabsBar: FunctionComponent = () => {
  const route = useRoute()

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
