import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/screens/GameMod/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subText}>To the Ultimate Guessing Experience</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton label="Continue" onPress={() => navigation.navigate("GameModeSelect")} icon={{ icon: "arrow-forward" }} />
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
