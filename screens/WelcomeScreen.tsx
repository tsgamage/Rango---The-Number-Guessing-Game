import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../components/ui/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Colors } from "../constants/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

function WelcomeScreen({ navigation }: Props) {
  return (
    <LinearGradient colors={Colors.gradients.primary as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subText}>To the Ultimate Guessing Experience</Text>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label="Continue"
            onPress={() => navigation.navigate("GameModeSelect")}
            icon={{ icon: "arrow-forward" }}
            // Rely on default premium styles for a cleaner look
            buttonTextStyle={{ color: Colors.text, fontSize: 18 }} // Ensure text is visible
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 48, // Slightly more refined size
    textAlign: "center",
    color: Colors.text,
    fontWeight: "800", // Strong but not maximum bold
    letterSpacing: 1, // Professional spacing
    textShadowColor: "rgba(0,0,0,0.5)", // Subtler shadow
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.textSecondary,
    marginTop: 12,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "60%",
  },
});
