import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { Colors, FontSize } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onGoingBack: () => void;
}

function ScreenWrapper({ children, style, onGoingBack }: Props) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.goBackIconContainer}>
        <Pressable
          android_ripple={{ color: "#00000028", foreground: true }}
          style={styles.goBackIcon}
          onPress={onGoingBack}
        >
          <Ionicons style={styles.backIcon} name="arrow-back" />
        </Pressable>
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: Colors.light.background,
  },
});

export default ScreenWrapper;
