import {FunctionComponent} from 'react'
import { useWindowDimensions } from 'react-native'
import {FlashList} from '@shopify/flash-list'

const LogList: FunctionComponent = () => {
  const {width} = useWindowDimensions()

  return (
    <>
      {/* <FlashList
        data={[]}
        renderItem={}
        keyExtractor={}
        estimatedItemSize={100}
        estimatedListSize={{height: 100 * 10, width}}
      /> */}
    </>
  )
}

export default LogList