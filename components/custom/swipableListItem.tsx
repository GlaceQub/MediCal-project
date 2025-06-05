import {ComponentProps, FunctionComponent, PropsWithChildren, useRef} from 'react'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import {useWindowDimensions, View} from 'react-native'
import {Button, ButtonIcon} from '@/components/ui/button'
import {HStack} from '@/components/ui/hstack'
import {FontAwesome5} from '@expo/vector-icons'

interface SwipeableListItemProps extends PropsWithChildren {
  actionButtons: Array<{
    icon: string
    onPress: () => void
    bgColor?: string
    iconColor?: string
  }>
}

const SwipeableListItem: FunctionComponent<SwipeableListItemProps> = ({children, actionButtons}) => {
  // De useSharedValue hook definieert een gedeelde waarde die zowel gebruikt kan worden in het JS-thread als het
  // UI-thread.
  // Een normale useState kan hier niet gebruikt worden omdat dit enkel in de JS-thread werkt en niet doorgegeven
  // wordt aan het UI-thread.
  const xOffset = useSharedValue<number>(0)
  const actionButtonsWidth = useSharedValue<number>(0)

  // De useWindowDimensions hook uit React Native (geen lib nodig) geeft de dimensies van het scherm terug.
  const dimensions = useWindowDimensions()

  // De useAnimatedStyle hook uit Reanimated wordt gebruikt om stijlregels te schrijven die invloed hebben op een
  // animatie.
  // We kunnen vanuit React natuurlijk ook elke milliseconde de stijlregels aanpassen, maar dit is veel minder
  // performant en produceert daarbovenop ook nog eens minder aangename (vloeiende) animaties.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: xOffset.value}],
    }
  })

  // Het pan gesture uit React Native Gesture Handler wordt gebruikt om continue gestures te detecteren, zoals het
  // verslepen van een element.
  // De andere beschikbare gestures kunnen geraadpleegd worden op
  // https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/gesture#gesturetap.
  const gesture = Gesture.Pan()
    .onUpdate(e => {
      // Een negatieve waarde op de x-as betekent dat het element naar links versleept wordt.
      // We willen enkel een translatie naar links toestaan als het menu nog niet open is.
      if (e.translationX < 0) {
        const minX = -actionButtonsWidth.value - 100
        xOffset.value = Math.max(e.translationX, minX)
      }
    })
    .onEnd(e => {
      if (-1 * e.translationX > dimensions.width / 3) {
        // withTiming is een functie uit Reanimated die een animatie start die over een tijdsinterval beweegt
        // naar de opgegeven waarde.
        // Via een optionele tweede parameter kan het tijdsinterval van de animatie ingesteld worden.

        // We zetten het menu vast zodat er rechts juist ruimte over is voor de actieknoppen.
        xOffset.value = withTiming(-actionButtonsWidth.value)
      } else {
        // Als niet minstens 1/3 van het de schermbreedte geswiped is, zetten we de knoppen terug op de
        // begintoestand.
        // Dit werkt ook om het menu terug te sluiten met een swipe naar rechts.
        xOffset.value = withTiming(0)
      }
    })
    // Zonder deze opties is het niet mogelijk om door de lijst te scrollen.
    // Door een minimale horizontale verplaatsing van 10 te eisen, wordt het gesture niet geactiveerd voor verticale
    // bewegingen.
    // In dat geval wordt het gesture doorgegeven naar de bovenliggende component, i.e. de FlashList.
    .activeOffsetX([-10, 10])

  return (
    // De gesture detector is een provider die gestures detecteert.
    <GestureDetector gesture={gesture}>
      <View style={{flexDirection: 'row', position: 'relative'}}>
        {/* Background for action area, stretches full width */}
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            left: '70%', // adjust if you want to only cover the right part
            backgroundColor: actionButtons.length > 0 ? (actionButtons[actionButtons.length - 1].bgColor || 'transparent') : 'transparent',
            zIndex: 0,
          }}
          pointerEvents="none"
        />
        <Animated.View style={[animatedStyle, {flexDirection: 'row', zIndex: 1}]}>
          {children}
          <HStack
            onLayout={evt => actionButtonsWidth.set(evt.nativeEvent.layout.width)}>
            {actionButtons.map((action, index) => (
              <Button
                onPress={() => {
                  action.onPress()
                  xOffset.value = withTiming(0)
                }}
                key={index}
                className="h-full border-0 rounded-none"
                style={{width: 70, backgroundColor: action.bgColor || 'transparent'}}
                variant="outline">
                <FontAwesome5 name={action.icon} size={24} color={action.iconColor} />
              </Button>
            ))}
          </HStack>
        </Animated.View>
      </View>
    </GestureDetector>
  )
}

export default SwipeableListItem
