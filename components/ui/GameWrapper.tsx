import { View, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { Colors, FontSize } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPause: () => void;
  onPlay: () => void;
}

import { LinearGradient } from "expo-linear-gradient";

function GameWrapper({ children, style, onPause, onPlay }: Props) {
  return (
    <LinearGradient colors={Colors.gradients.primary as any} style={styles.gradient}>
      <SafeAreaView style={[styles.container, style]}>
        <View style={styles.goBackIconContainer}>
          <Pressable android_ripple={{ color: "#00000028", foreground: true }} style={styles.goBackIcon} onPress={onPause}>
            <Ionicons style={styles.backIcon} name="pause" />
          </Pressable>
        </View>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  goBackIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "100%",
    overflow: "hidden",
  },
  goBackIcon: {},
  backIcon: { fontSize: FontSize.extraExtraLarge },
  container: {
    flex: 1,
    padding: 10,
    // Background handled by LinearGradient wrapper
  },
});

export default GameWrapper;
