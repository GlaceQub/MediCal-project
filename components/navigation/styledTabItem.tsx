import {ComponentProps, FunctionComponent, useContext} from 'react'
import {Text, View} from 'react-native'
import StyledText from '@/components/styledText'
import {ThemeContext} from '@/context/themeProvider'
import {FontAwesome5} from '@expo/vector-icons'
import {Link} from 'expo-router'
import hex2rgba from '@/utils/hex2rgba'

type StyledTextProps = ComponentProps<typeof Text>
interface StyledTabItemProps extends StyledTextProps {
  href: ComponentProps<typeof Link>['href']
  isActive?: boolean
  icon?: string
}

const StyledTabItem: FunctionComponent<StyledTabItemProps> = ({
  children,
  icon,
  href,
  isActive = true,
  style,
  ...textProps
}) => {
  const {margin, padding, colors} = useContext(ThemeContext)

  const activeStyle = {
    backgroundColor: hex2rgba(colors.primary, 0.3),
    borderRadius: 20,
  }

  return (
    <Link href={href} style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <View>
        <View style={[{width: 85, alignItems: 'center', marginBottom: margin.sm, padding: padding.sm}, isActive && activeStyle]}>
          <FontAwesome5 name={icon} size={24} color={colors.text} />
        </View>
        <StyledText style={[{fontSize: 16, marginBottom: margin.sm, textAlign: 'center'}, style]} {...textProps}>
          {children}
        </StyledText>
      </View>
    </Link>
  )
}

export default StyledTabItem
