import {Stack} from 'expo-router'
import React, {FunctionComponent} from 'react'

const Layout: FunctionComponent = () => {
  return (
    <Stack>
      <Stack.Screen
        name="logs"
        options={{
          title: 'Logboek',
          headerShown: false,
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="pills"
        options={{
          title: 'Medicatie',
          headerShown: false,
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: 'Profiel',
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack>
  )
}

export default Layout
