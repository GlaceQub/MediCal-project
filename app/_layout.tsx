import AppHeader from '@/components/appHeader'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppHeader/>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="login/login"
          options={{
            title: 'Login',
            headerShown: false,
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
