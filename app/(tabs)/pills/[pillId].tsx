import PillForm from "@/components/pills/pillForm";
import { useLocalSearchParams } from "expo-router";
import { FunctionComponent } from "react";

const PillRecord: FunctionComponent = () => {
  const {pillId} = useLocalSearchParams<{pillId: string}>();
  return <PillForm id={pillId} />;
}

export default PillRecord