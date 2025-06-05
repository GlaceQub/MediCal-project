import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent} from 'react'
import {View} from 'react-native'
import {useSignOut} from '@/api/auth'
import {Button, ButtonText} from '@/components/ui/button'
import useUser from '@/hooks/useUser'
import {FontAwesome5} from '@expo/vector-icons'
import StyledText from '@/components/styledText'
import colors from 'tailwindcss/colors'

const Index: FunctionComponent = () => {
  const {mutate: signOut} = useSignOut()
  const user = useUser()

  return (
    <>
      <TabsBar />
      <View className="mx-4" style={{marginTop: 32}}>
        {user && (
          <View style={{alignItems: 'center'}}>
            <FontAwesome5 name="user" size={80} style={{marginVertical: 8, color:colors.red[500], marginBottom:24}} />
            <StyledText style={{fontSize: 24, fontWeight: 'bold', marginBottom: 4}}>
              {user.displayName ?? 'No name set'}
            </StyledText>
            <StyledText style={{fontSize: 16, color: colors.gray[500]}}>
              {user.email}
            </StyledText>
          </View>
        )}
        <Button variant="outline" onPress={() => signOut()} className="px-5" style={{marginTop: 64, alignSelf: 'center'}}>
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          <ButtonText>Logout</ButtonText>
        </Button>
      </View>
    </>
  )
}

export default Index
