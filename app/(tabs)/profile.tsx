import TabsBar from '@/components/navigation/tabsBar'
import {FunctionComponent, useContext} from 'react'
import {View} from 'react-native'
import {useSignOut} from '@/api/auth'
import {Button, ButtonText} from '@/components/ui/button'
import useUser from '@/hooks/useUser'
import {FontAwesome5} from '@expo/vector-icons'
import StyledText from '@/components/styledText'
import colorsTW from 'tailwindcss/colors'
import {ThemeContext} from '@/context/themeProvider'


const Index: FunctionComponent = () => {
  const {colors} = useContext(ThemeContext)
  const {mutate: signOut} = useSignOut()
  const user = useUser()

  return (
    <>
      <TabsBar />
      <View className="mx-4" style={{marginTop: 32}}>
        {user && (
          <View style={{alignItems: 'center'}}>
            <FontAwesome5 name="user" size={80} style={{marginVertical: 8, color:colorsTW.red[500], marginBottom:24}} />
            <StyledText style={{fontSize: 24, fontWeight: 'bold', marginBottom: 4}}>
              {user.displayName ?? 'No name set'}
            </StyledText>
            <StyledText style={{fontSize: 16, color: colorsTW.gray[500]}}>
              {user.email}
            </StyledText>
          </View>
        )}
        <Button variant="outline" onPress={() => signOut()} className="px-5" style={{marginTop: 64, alignSelf: 'center'}}>
          <FontAwesome5 name="sign-out-alt" size={24} color={colors.text} />
          <ButtonText>Logout</ButtonText>
        </Button>
      </View>
    </>
  )
}

export default Index
