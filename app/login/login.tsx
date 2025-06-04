import {Redirect} from 'expo-router'
import {FunctionComponent, useContext} from 'react'
import {useWindowDimensions, View} from 'react-native'
import {AuthProvider, useSignIn} from '@/api/auth'
import {Button, ButtonText} from '@/components/ui/button'
import useUser from '@/hooks/useUser'
import AppTitle from '@/components/appTitle'
import {Image} from '@/components/ui/image'
import {ThemeContext} from '@/context/themeProvider'

const Login: FunctionComponent = () => {
  const {colors} = useContext(ThemeContext)

  const {mutate: signInWithSocialAuth} = useSignIn()
  const user = useUser()

  if (user) {
    return <Redirect href="/" />
  }

  return (
    <View style={{alignItems: 'center', height: '100%', backgroundColor: colors.card}}>
      <View style={{marginVertical:'auto'}}>
        <View style={{marginBottom: 20}}>
          <Image source={require('@/assets/images/app-icon-calendar-light.png')} alt="app-icon" size="2xl" />
        </View>
        <Button
          style={{borderRadius: 10}}
          variant="solid"
          onPress={() => signInWithSocialAuth({provider: AuthProvider.GOOGLE})}>
          <ButtonText>Sign in with Google</ButtonText>
        </Button>
      </View>
    </View>
  )
}

export default Login
