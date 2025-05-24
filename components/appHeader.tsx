import {FunctionComponent, useContext} from "react"
import AppTitle from "@/components/appTitle"
import {FontAwesome5} from "@expo/vector-icons"
import {ThemeContext} from "@/context/themeProvider"
import {View} from "react-native"
import StyledText from "./styledText"

//Toevoegen voor Icon ingelogde persoon

const AppHeader: FunctionComponent = () => {
  const {colors, padding} = useContext(ThemeContext)

  const userName = "David" // Replace with actual user name from context or props

  return (
    <View style={{flexDirection: "row", alignItems: "center", padding: padding.md}}>
      <View style={{flex: 1, alignItems: "center"}}>
        <AppTitle>Medi+Cal</AppTitle>
      </View>
      <View style={{flexDirection: "row",position: "absolute", right: 10}}>
        <StyledText style={{color: colors.text, fontSize: 14, paddingRight: padding.sm,}}>
          {userName}
        </StyledText>
        <FontAwesome5 name="user" size={24} color={colors.text} />
      </View>
    </View>
  )
}

export default AppHeader
