import { StyleSheet, Text, StyleProp, TextStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

function DynamicReaction({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default DynamicReaction;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
