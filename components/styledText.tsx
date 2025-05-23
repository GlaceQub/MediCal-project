import {ComponentProps, FunctionComponent, useContext} from 'react'
import {ThemeContext} from '../context/themeProvider'
import {Text} from 'react-native'

/**
 * Via de ComponentProps interface kunnen de properties van een component uitgelezen worden en in een nieuwe
 * interface geplaatst worden.
 * Op deze manier kunnen we alle properties die aan de Text component doorgegeven worden, ook doorgeven
 * aan deze component.
 */
type StyledTextProps = ComponentProps<typeof Text>

const StyledText: FunctionComponent<StyledTextProps> = ({children, style, ...textProps}) => {
  const {colors} = useContext(ThemeContext)

  return (
    <Text style={[{color: colors.text}, style]} {...textProps}>
      {children}
    </Text>
  )
}

export default StyledText
