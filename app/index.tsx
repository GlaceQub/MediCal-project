import StyledTitle from "@/components/styledTitle";
import { Link } from "expo-router";
import { FunctionComponent } from "react";
import { View } from "react-native";

const Index: FunctionComponent = () => {

  return (
    <View>
      <StyledTitle>
        <Link href="/login/login">Go to login</Link>
      </StyledTitle>
      <StyledTitle>
        <Link href="/(tabs)/logs">Go to Tabs</Link>
      </StyledTitle>      
    </View>
  );
}

export default Index;
