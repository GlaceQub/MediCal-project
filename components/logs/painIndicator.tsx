import { statusColors } from "@/context/themeProvider";
import number2color from "@/utils/number2color";
import { FunctionComponent } from "react";
import { View } from "react-native";

interface PainIndicationProps {
  pain: number; // value between 1 and 10 inclusive
}

const PainIndicator: FunctionComponent<PainIndicationProps> = ({ pain }) => {
  const color = number2color(pain, 1, 10, Object.values(statusColors));
  return (
    <View>
      
    </View>
  )
}

export default PainIndicator;