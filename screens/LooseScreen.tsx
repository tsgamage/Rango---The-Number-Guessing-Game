import { StyleSheet, Text, Vibration, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import ScreenHeader from "../components/ui/ScreenHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors, FontSize } from "../constants/theme";

import { Game1StackParamList } from "../screens/Game1Screen";
import DynamicReaction from "../components/ui/DynamicReaction";
import { useLayoutEffect } from "react";

type Props = NativeStackScreenProps<Game1StackParamList, "Loose">;

function LooseScreen({ navigation, route }: Props) {
  const { title, subtitle, nextRoute, number } = route.params;

  useLayoutEffect(() => {
    Vibration.vibrate([0, 100, 50, 100, 150, 200]);
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.emoji}>😵</Text>
          <ScreenHeader>{title}</ScreenHeader>
          <Text style={styles.subtext}>The number was</Text>
          {number !== undefined && <Text style={styles.number}>{number}</Text>}
          {subtitle && <DynamicReaction style={styles.subtitle}>{subtitle}</DynamicReaction>}
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton label="Try Again" onPress={() => navigation.replace(nextRoute as any)} icon={{ icon: "refresh" }} />
          <PrimaryButton
            label="Exit to Menu"
            onPress={() => navigation.getParent()?.navigate("GameModeSelect")}
            icon={{ icon: "home" }}
            containerStyle={{ marginTop: 16 }}
            buttonContainerStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderWidth: 0 }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default LooseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
  },
  contentContainer: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 120,
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    textAlign: "center",
    maxWidth: "80%",
  },
  subtext: {
    fontSize: FontSize.medium,
    color: Colors.text,
  },
  number: {
    fontSize: FontSize.extraLarge,
    color: Colors.textHighlight,
    fontWeight: "bold",
    marginVertical: 10,
    textShadowColor: Colors.primaryDark,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    width: "100%",
  },
});
