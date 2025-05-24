import { defaultSpacing, ThemeContext } from '@/context/themeProvider';
import { FunctionComponent, useContext } from 'react';
import {useRouter} from 'expo-router'
import { StyleSheet, View } from 'react-native';

const LogItem: FunctionComponent = () => {
  const {colors, padding, margin} = useContext(ThemeContext)
  const router = useRouter()

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border}]}>
      
    </View>
  )
}

// Example usage of colors in StyleSheet.create
const styles = StyleSheet.create({
    container: {
      padding: defaultSpacing.padding.md,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    }
  });

export default LogItem