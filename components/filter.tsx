import {FunctionComponent, useContext} from 'react'
import {View} from 'react-native'
import {Input, InputField, InputSlot} from '@/components/ui/input'
import {StyleSheet} from 'react-native'
import {Button} from '@/components/ui/button'
import {FontAwesome5} from '@expo/vector-icons'
import {ThemeContext} from '@/context/themeProvider'
import { useRouter } from 'expo-router'

interface FilterProps {
  itemType: 'logs' | 'pills',
  onFilterChange: (value: string) => void;
}

const Filter: FunctionComponent<FilterProps> = ({ itemType, onFilterChange }) => {
  const {colors} = useContext(ThemeContext)
  const router = useRouter()

  const handleFilterChange = (value: string) => {
    onFilterChange(value)
  }

  return (
    <View style={styles.container}>
      <Input variant="rounded" style={[styles.input, {borderColor: colors.border}]}>
        <InputSlot>
          <FontAwesome5 name="search" size={18} style={styles.icon} />
        </InputSlot>
        <InputField style={{fontSize: 16}} type="text" onChangeText={handleFilterChange}/>
      </Input>
      <Button
        size="md"
        variant="solid"
        style={[styles.addButton, {backgroundColor: colors.background, borderColor: colors.border}]}
        action="primary"
        onPress={() => router.push(`/(tabs)/${itemType}/create`)}>
        <FontAwesome5 name="plus" size={24} color='#ff3d3d' style={{margin:-10}} />
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
    margin:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
  },
})

export default Filter