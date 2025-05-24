import {createContext, FunctionComponent, PropsWithChildren} from 'react'
import {StyleSheet, useColorScheme, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {DefaultTheme, ThemeProvider as NavigationThemeProvider} from '@react-navigation/native'
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import GluestackUIProvider from '@/components/ui/gluestack-ui-provider'
import colors from "tailwindcss/colors"

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
  border: string,
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
  good: colors.green[500],
  ok: colors.lime[500],
  warning: colors.amber[400],
  bad: colors.orange[500],
  critical: colors.red[500],
}

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.red[400],
    background: colors.black,
    card: colors.neutral[950],
    text: colors.neutral[300],
    border: colors.neutral[500],
    notification: colors.neutral[700],
    status: statusColors
  },
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.red[400],
    background: colors.neutral[50],
    card: colors.neutral[100],
    text: colors.neutral[800],
    border: colors.neutral[300],
    notification: colors.neutral[700],
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
      <GluestackUIProvider>
      <NavigationThemeProvider value={{...DefaultTheme, ...activeTheme}}>
        <SafeAreaProvider>
          <StatusBar style="auto" backgroundColor={activeTheme.colors.card} />
          <View style={[{backgroundColor: activeTheme.colors.background, marginTop: top}, styles.container]}>{children}</View>
        </SafeAreaProvider>
      </NavigationThemeProvider>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ThemeProvider
