import StyledText from "@/components/styledText";
import { Button } from "@/components/ui/button";
import { FunctionComponent } from "react";
import { StyleSheet, Text } from "react-native";
import colors from "tailwindcss/colors";

interface DayButtonProps {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isSelected: boolean;
}

const DayButton: FunctionComponent<DayButtonProps> = ({ day, isSelected }) => {
  const buttonStyle = isSelected ? styles.buttonActive : styles.buttonNormal;
  const textStyle = isSelected ? styles.buttonActiveText : styles.buttonNormalText;

  return (
    <Button style={buttonStyle}>
      <StyledText style={textStyle}>{day.charAt(0).toUpperCase() + day.slice(1, 3)}</StyledText>
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonNormal: {
    backgroundColor: colors.gray[200],
  },
  buttonNormalText: {
    color: colors.black,
  },
  buttonActive: {
    backgroundColor: colors.blue[500],
  },
  buttonActiveText: {
    color: colors.white,
  },
});

export default DayButton;