import StyledText from '@/components/styledText'
import { Link } from 'expo-router'
import {FunctionComponent} from 'react'
import {Text} from 'react-native'

const Login: FunctionComponent = () => {
  return (
    <>
      <StyledText><Link href="/">Go to home</Link></StyledText>
    </>
  )
}

export default Login