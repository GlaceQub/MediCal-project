import '@/global.css'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !__DEV__,
      staleTime: Infinity,
    },
  },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <Stack>
            <Stack.Screen name="index" options={{title: 'Home', headerShown: false}} />
            <Stack.Screen name="login/login" options={{title: 'Login', headerShown: false, animation: 'fade'}} />
            <Stack.Screen name="(tabs)" options={{headerShown: false, animation: 'fade'}} />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
