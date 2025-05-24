import { statusColors, ThemeContext } from "@/context/themeProvider";
import number2color from "@/utils/number2color";
import { FunctionComponent, useContext } from "react";
import { View } from "react-native";
import StyledText from "../styledText";
import { Progress, ProgressFilledTrack } from "../ui/progress";

interface PainIndicationProps {
  pain: number; // value between 1 and 10 inclusive
}

const PainIndicator: FunctionComponent<PainIndicationProps> = ({ pain }) => {
  const { colors, padding, margin } = useContext(ThemeContext);
  const progressColor = number2color(pain, 1, 10, Object.values(statusColors));
  
  // Linear interpolation: maps pain in [1,10] to [1,100]
  const progressValue = ((pain - 1) * (100 - 1)) / (10 - 1) + 1;

  return (
    <View style={{flexDirection: "row"}}>
      <StyledText style={{ color: colors.text, fontSize: 16, verticalAlign: "middle", textAlign:"right", width: 20}}>{Math.floor(pain)}</StyledText>
      <Progress value={progressValue} size="md" orientation="vertical" style={{marginLeft: margin.sm}} >
        <ProgressFilledTrack style={{backgroundColor: progressColor}} />
      </Progress>
    </View>
  )
}

export default PainIndicator;