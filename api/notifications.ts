import IPill from '@/models/IPill'
import * as Notifications from 'expo-notifications'
import {Platform} from 'react-native'
import Constants from 'expo-constants'

// Check buildmode
if (__DEV__) {
  console.log('Constants.executionEnvironment: ', Constants.executionEnvironment)
}

// PERMISSIONS
export async function registerForPushNotificationsAsync() {
  let status
  if (Platform.OS === 'android') {
    const {status: existingStatus} = await Notifications.getPermissionsAsync()
    status = existingStatus
    if (status !== 'granted') {
      const {status: newStatus} = await Notifications.requestPermissionsAsync()
      status = newStatus
    }
  }
}

// HANDLER
export async function setNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false, // Set to true if you want to update the badge count
    }),
  })
}

// NOTIFICATIONS

export async function scheduleNextPillNotification(pill: IPill): Promise<string | null> {
  const now = new Date()

  // Ensure startDate is in local timezone
  const utc = new Date(pill.date)
  const startDate = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate())

  const duration = pill.duration ?? 0
  const daysOfWeek = Object.entries(pill.days)
    .filter(([_, active]) => active)
    .map(([day]) => day)

  let nextNotificationDate: Date | null = null

  const maxDays = duration === 0 ? 8 : duration
  for (let dayOffset = 0; dayOffset < maxDays; dayOffset++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + dayOffset)
    const weekday = date.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase()

    if (daysOfWeek.includes(weekday)) {
      for (const moment of pill.moments) {
        const notificationDate = new Date(date)
        notificationDate.setHours(moment.hour, moment.minute, 0, 0)
        if (notificationDate > now) {
          if (!nextNotificationDate || notificationDate < nextNotificationDate) {
            nextNotificationDate = notificationDate
          }
        }
      }
    }
  }

  if (nextNotificationDate && Platform.OS === 'android') {
    console.log('Scheduling notification for:', nextNotificationDate.toString())
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Pill Reminder',
        body: `Time to take: ${pill.name}`,
        sound: true,
        data: {pillId: pill.id},
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: nextNotificationDate
      }
    })
    return id
  }
  return null
}

export async function cancelPillNotifications(notificationIds: string[]) {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id)
  }
}
