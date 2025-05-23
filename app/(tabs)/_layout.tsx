import {Stack} from 'expo-router'
import React, {FunctionComponent} from 'react'
import {FontAwesome5} from '@expo/vector-icons'

const Layout: FunctionComponent = () => {
  return (
    <Stack>
      <Stack.Screen
        name="logs"
        options={{
          title: 'Logboek',
          headerShown: false,
          animation: 'fade',
          // tabBarIcon: ({ color, size}) => <FontAwesome5 name="book-medical" size={size} color={color} />,
        }}
      />

      <Stack.Screen
        name="pills"
        options={{
          title: 'Medicatie',
          headerShown: false,
          animation: 'fade',
          // tabBarIcon: ({ color, size}) => <FontAwesome5 name="pills" size={size} color={color} />,
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: 'Profiel',
          headerShown: false,
          animation: 'fade',
          // tabBarIcon: ({ color, size}) => <FontAwesome5 name="portrait" size={size} color={color} />,
        }}
      />
    </Stack>
  )
}

export default Layout
