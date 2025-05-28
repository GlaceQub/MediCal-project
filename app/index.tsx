import StyledTitle from '@/components/styledTitle'
import useUser from '@/hooks/useUser'
import {Link, Redirect} from 'expo-router'
import {FunctionComponent} from 'react'
import {View} from 'react-native'

const Index: FunctionComponent = () => {
  const user = useUser

  if (!user) {
    return <Redirect href="/login/login" />
  }

  return <Redirect href="/(tabs)/logs/logs" />
}

export default Index
