import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent} from 'react'
import {View} from 'react-native'
import { useSignOut } from '@/api/auth'
import { Button, ButtonText } from '@/components/ui/button'
import useUser from '@/hooks/useUser'
import { FontAwesome5 } from '@expo/vector-icons'
import { Redirect } from 'expo-router'

const Index: FunctionComponent = () => {
  const user = useUser()
  const {mutate: signOut} = useSignOut()

  return (
    <>
      <TabsBar />
      <View className="mx-4">
      <Button variant="outline" onPress={() => signOut()} className="mx-4">
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          <ButtonText>Logout</ButtonText>
        </Button>
    </View>
    </>
  )
}

export default Index