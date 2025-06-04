import LogForm from "@/components/logs/logForm";
import { useLocalSearchParams } from "expo-router";
import { FunctionComponent } from "react";

const LogRecord: FunctionComponent = () => {
  const {logId} = useLocalSearchParams<{logId: string}>();
  return <LogForm id={logId} />;
}

export default LogRecord