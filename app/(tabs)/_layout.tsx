import {Stack} from 'expo-router'
import React, {FunctionComponent} from 'react'
import {Redirect} from 'expo-router'
import useUser from '@/hooks/useUser'

const Layout: FunctionComponent = () => {
  const user = useUser()

  if (!user) {
    return <Redirect href="/login/login" />
  }

  return (
    <Stack>
      <Stack.Screen
        name="logs/logs"
        options={{
          title: 'Logboek',
          headerShown: false,
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="pills/pills"
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
