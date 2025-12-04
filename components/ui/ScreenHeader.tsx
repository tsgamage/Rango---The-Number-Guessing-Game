import {
  StyleSheet,
  StyleProp,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  headerSize?: "small" | "large";
}
function ScreenHeader({
  children,
  style,
  headerStyle,
  headerSize = "large",
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[
          styles.text,
          headerSize === "small" && styles.smallText,
          headerSize === "large" && styles.largeText,
          headerStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: "center",
  },
  largeText: {
    fontSize: 32,
  },
  smallText: {
    fontSize: 24,
  },
});
