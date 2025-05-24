import {ComponentProps, FunctionComponent, useContext} from 'react'
import {Text} from 'react-native'
import StyledText from './styledText'
import {ThemeContext} from '@/context/themeProvider'

/**
 * Via de ComponentProps interface kunnen de properties van een component uitgelezen worden en in een nieuwe
 * interface geplaatst worden.
 * Op deze manier kunnen we alle properties die aan de Text component doorgegeven worden, ook doorgeven
 * aan deze component.
 */
type StyledTextProps = ComponentProps<typeof Text>

const StyledTitle: FunctionComponent<StyledTextProps> = ({children, style, ...textProps}) => {
  const {margin} = useContext(ThemeContext)

  return (
    <StyledText style={[{fontSize: 22}, style]} {...textProps}>
      {children}
    </StyledText>
  )
}

export default StyledTitle
