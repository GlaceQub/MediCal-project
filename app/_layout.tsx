import '@/global.css'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import {registerForPushNotificationsAsync, scheduleNextPillNotification} from '@/api/notifications'
import { getPill } from '@/api/pills'
import useUser from '@/hooks/useUser'
import { Platform } from 'react-native'
import { useUpdatePill } from '@/api/pills'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !__DEV__,
      staleTime: Infinity,
    },
  },
})

function AppLayout() {
  const user = useUser()
  const { mutate: updatePill } = useUpdatePill()

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync()
    }
  }, [user])

  useEffect(() => {
    // Set up Android notification channel for sound
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default', // Enable default sound
      })
    }

    // Notification chaining listener
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
      const pillId = notification.request.content.data?.pillId
      if (pillId) {
        const pill = await getPill(pillId)
        if (pill) {
          const newNotificationId = await scheduleNextPillNotification(pill)
          if (newNotificationId) {
            updatePill(
              { ...pill, id: pill.id as string, notificationIds: [newNotificationId] },
              {
                onError: (error) => {
                  console.log('Failed to update pill:', error)
                }
              }
            )
          }
        }
      }
    })
    return () => subscription.remove()
  }, [updatePill])

  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Home', headerShown: false}} />
      <Stack.Screen name="login/login" options={{title: 'Login', headerShown: false, animation: 'fade'}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false, animation: 'fade'}} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppLayout />
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
