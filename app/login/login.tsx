import {Redirect} from 'expo-router'
import {FunctionComponent} from 'react'
import {View} from 'react-native'
import {AuthProvider, useSignIn} from '@/api/auth'
import {Button, ButtonText} from '@/components/ui/button'
import useUser from '@/hooks/useUser'

const Login: FunctionComponent = () => {
  const {mutate: signInWithSocialAuth} = useSignIn()
  const user = useUser()

  if (user) {
    return <Redirect href="/" />
  }

  return (
    <View className="mx-4">
      <Button variant="outline" onPress={() => signInWithSocialAuth({provider: AuthProvider.GOOGLE})}>
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </View>
  )
}

export default Login
