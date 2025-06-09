import IPill from '@/models/IPill';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Check buildmode
if (__DEV__) {
  console.log('Constants.executionEnvironment: ', Constants.executionEnvironment);
}

// PERMISSIONS
export async function registerForPushNotificationsAsync() {
  let status;
  if (Platform.OS === 'android') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    status = existingStatus;
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      status = newStatus;
    }
  }
}

// NOTIFICATIONS

export async function scheduleNextPillNotification(pill: IPill): Promise<string | null> {
  const now = new Date();
  const startDate = new Date(pill.date);
  const duration = pill.duration ?? 0;
  const daysOfWeek = Object.entries(pill.days)
    .filter(([_, active]) => active)
    .map(([day]) => day);

  let nextNotificationDate: Date | null = null;

  // Find the next valid moment
  const maxDays = duration === 0 ? 8 : duration; // Prevent infinite loop
  for (let dayOffset = 0; dayOffset < maxDays; dayOffset++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    if (daysOfWeek.includes(weekday)) {
      for (const moment of pill.moments) {
        const notificationDate = new Date(date);
        console.log('moment:', moment);
        notificationDate.setHours(moment.hour, moment.minute, 0, 0);
        if (notificationDate > now) {
          if (!nextNotificationDate || notificationDate < nextNotificationDate) {
            nextNotificationDate = notificationDate;
          }
        }
      }
    }
  }

  if (nextNotificationDate && Platform.OS === 'android') {
    console.log('Scheduling notification for:', nextNotificationDate);
    const seconds = Math.floor((nextNotificationDate.getTime() - now.getTime()) / 1000);
    console.log('now:', now);
    console.log('nextNotificationDate:', nextNotificationDate);
    console.log('seconds until notification:', seconds);
    if (seconds > 0) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Pill Reminder',
          body: `Time to take: ${pill.name}`,
          sound: true,
          data: { pillId: pill.id }, // Add pillId for chaining
        },
        trigger: { seconds, channelId: 'default' },
      });
      return id;
    }
  }
  return null;
}

export async function cancelPillNotifications(notificationIds: string[]) {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}

