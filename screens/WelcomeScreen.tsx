import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/screens/GameMod/PrimaryButton";
import { AppState } from "../App";

interface Props {
  onContinue: (state: AppState) => void;
}

function WelcomeScreen({ onContinue }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subText}>To the Ultimate Guessing Experience</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Continue"
          onPress={() => onContinue("game_mode_select")}
          icon={{ icon: "arrow-forward" }}
        />
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 50,
    textAlign: "center",
  },
  subText: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    width: "60%",
  },
});
