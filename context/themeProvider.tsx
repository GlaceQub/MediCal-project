import {createContext, FunctionComponent, PropsWithChildren} from 'react'
import {StyleSheet, useColorScheme, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {DefaultTheme, ThemeProvider as NavigationThemeProvider} from '@react-navigation/native'
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
// import GluestackUIProvider from '@/components/ui/gluestack-ui-provider'

interface SpacingSizes {
  sm: number
  md: number
  lg: number
}

interface Spacing {
  padding: SpacingSizes
  margin: SpacingSizes
}

export const defaultSpacing: Spacing = {
  padding: {
    sm: 5,
    md: 10,
    lg: 30,
  },
  margin: {
    sm: 5,
    md: 10,
    lg: 20,
  },
}

interface Colors {
  primary: string
  background: string
  card: string
  text: string
  border: string
  notification: string,
  status: statusColors
}

interface statusColors {
  good: string
  ok: string
  warning: string
  bad: string
  critical: string
}

interface Theme {
  dark: boolean
  colors: Colors
}

export const statusColors: statusColors = {
  good: '#4CAF50',
  ok: '#1f62ff',
  warning: '#ffda1f',
  bad: '#ff8b26',
  critical: '#F44336',
}

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FFA6A6',
    text: '#d4d7db',
    border: '#d4d7db',
    notification: '#dae2ff',
    background: '#282c34',
    card: '#1c1c22',
    status: statusColors
  },
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#FF7373',
    text: '#0F0F0F',
    border: '#0F0F0F',
    notification: '#dae2ff',
    background: '#ffffff',
    card: '#f9f7f4',
    status: statusColors
  },
}

export const ThemeContext = createContext<Theme & Spacing>({
  ...lightTheme,
  ...defaultSpacing,
})

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const isDark = useColorScheme() === 'dark'
  const activeTheme = isDark ? darkTheme : lightTheme
  const {top} = useSafeAreaInsets()

  return (
    <ThemeContext.Provider value={{...activeTheme, ...defaultSpacing}}>
      {/* <GluestackUIProvider> */}
      <NavigationThemeProvider value={{...DefaultTheme, ...activeTheme}}>
        <SafeAreaProvider>
          <StatusBar style="auto" backgroundColor={activeTheme.colors.card} />
          <View style={[{backgroundColor: activeTheme.colors.background, marginTop: top}, styles.container]}>{children}</View>
        </SafeAreaProvider>
      </NavigationThemeProvider>
      {/* </GluestackUIProvider> */}
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ThemeProvider
