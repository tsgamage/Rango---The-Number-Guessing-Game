import { View, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { Colors, FontSize } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function ScreenWrapper({ children, style }: Props) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 15,
  },
});

export default ScreenWrapper;
