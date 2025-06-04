import {Stack} from 'expo-router'
import React, {FunctionComponent} from 'react'
import {Redirect} from 'expo-router'
import useUser from '@/hooks/useUser'
import AppHeader from '@/components/appHeader'

const Layout: FunctionComponent = () => {
  const user = useUser()

  if (!user) {
    return <Redirect href="/login/login" />
  }

  return (
    <>
      <AppHeader />
      <Stack key={user.uid}>
        <Stack.Screen name="logs/logs" options={{title: 'Logs', headerShown: false, animation: 'fade'}} />
        <Stack.Screen name="logs/create" options={{title: 'Create log', headerShown: false, animation: 'fade'}} />
        <Stack.Screen name="logs/[logId]" options={{title: 'Details log', headerShown: false, animation: 'fade'}} />
        
        <Stack.Screen name="pills/pills" options={{title: 'Medication', headerShown: false, animation: 'fade'}} />
        <Stack.Screen name="pills/create" options={{title: 'Create medication', headerShown: false, animation: 'fade'}} />
        <Stack.Screen name="pills/[pillId]" options={{title: 'Details medication', headerShown: false, animation: 'fade'}} />

        <Stack.Screen name="profile" options={{title: 'Profiel', headerShown: false, animation: 'fade'}} />
      </Stack>
    </>
  )
}

export default Layout
