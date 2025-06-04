
import { ThemeContext } from "@/context/themeProvider";
import { ComponentProps, FunctionComponent, useContext } from "react";
import { Text } from "react-native";
import StyledText from "./styledText";


type StyledTextProps = ComponentProps<typeof Text>;

const AppTitle: FunctionComponent<StyledTextProps> = ({ children, style, ...textProps }) => {
  const {margin} = useContext(ThemeContext)

  return (
    <StyledText style={[{ fontSize: 28} , style]} {...textProps}>
      {children}
    </StyledText>
  )
}

export default AppTitle;