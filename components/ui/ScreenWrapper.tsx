import { View, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { Colors, FontSize } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

import { LinearGradient } from "expo-linear-gradient";

function ScreenWrapper({ children, style }: Props) {
  return (
    <LinearGradient colors={Colors.gradients.primary as any} style={styles.gradient}>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
});

export default ScreenWrapper;
