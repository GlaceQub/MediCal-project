import StyledText from "@/components/styledText";
import getDayAbbreviation from "@/utils/dayAbbriviation";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import colors from "tailwindcss/colors";

interface DayCircleProps {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isSelected: boolean;
}

const DayCircle: FunctionComponent<DayCircleProps> = ({ day, isSelected }) => {
  const buttonStateStyle = isSelected ? styles.buttonActive : styles.buttonNormal;
  const textStateStyle = isSelected ? styles.buttonActiveText : styles.buttonNormalText;

  return (
    <View style={[buttonStateStyle, styles.button]}>
      <StyledText style={textStateStyle}>{getDayAbbreviation(day)}</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  buttonNormal: {
    backgroundColor: colors.red[100],
  },
  buttonNormalText: {
    color: colors.black,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  buttonActive: {
    backgroundColor: colors.red[600],
  },
  buttonActiveText: {
    color: colors.white,
    // fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DayCircle;