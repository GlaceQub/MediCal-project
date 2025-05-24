import {FunctionComponent, useContext} from 'react'
import {View} from 'react-native'
import {Input, InputField, InputSlot} from '@/components/ui/input'
import {StyleSheet} from 'react-native'
import {Button} from '@/components/ui/button'
import {FontAwesome5} from '@expo/vector-icons'
import {ThemeContext} from '@/context/themeProvider'
import { router } from 'expo-router'

interface FilterProps {
  itemType: 'logs' | 'pills'
}

const Filter: FunctionComponent<FilterProps> = ({ itemType }) => {
  const {colors} = useContext(ThemeContext)
  const isInvalid = false // This can be set based on validation logic

  return (
    <View style={styles.container}>
      <Input variant="rounded" style={[styles.input, {borderColor: colors.border}]}>
        <InputSlot>
          <FontAwesome5 name="search" size={18} style={styles.icon} />
        </InputSlot>
        <InputField style={{fontSize: 16}} type="text"/>
      </Input>
      <Button
        size="md"
        variant="solid"
        style={[styles.addButton, {backgroundColor: colors.background, borderColor: colors.border}]}
        action="primary"
        onPress={() => router.push(`/(tabs)/${itemType}/create`)}>
        <FontAwesome5 name="plus" size={16} color={colors.text} />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
  },
  icon: {
    marginLeft: 15,
    verticalAlign: 'middle',
  },
  addButton: {
    width: 50,
    height: 50,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    margin: 0,
  },
})

export default Filter
