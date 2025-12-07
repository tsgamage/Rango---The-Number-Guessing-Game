import { Alert, StyleSheet, Text, View } from "react-native";
import GameWrapper from "../../ui/GameWrapper";
import ScreenHeader from "../../ui/ScreenHeader";
import PrimaryButton from "../GameMod/PrimaryButton";
import DynamicReaction from "../../ui/DynamicReaction";
import { Colors, FontSize } from "../../../constants/theme";
import { getRandomItem } from "../../../utils/utils";
import { useState } from "react";
import { dynamicReactions } from "../../../data/dynamicReactions";
import { Game2StackParamList } from "../../../screens/Game2Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<Game2StackParamList, "Play">;

function PlayScreen({ navigation }: Props) {
  const [reaction, setReaction] = useState("");

  const handleLying = () => {
    setReaction(getRandomItem(dynamicReactions.lying));
    Alert.alert("Don't Lie to me...", getRandomItem(dynamicReactions.lying), [{ text: "Sorry", onPress: () => {} }]);
  };

  return (
    <GameWrapper
      onPlay={() => {
        navigation.goBack();
      }}
      onPause={() => {
        navigation.goBack();
      }}
    >
      <View style={styles.container}>
        {/* Dynamic Reaction at Top */}

        {/* Circular Glass Card for the Guess */}
        <View style={styles.circleContainer}>
          <View style={styles.glassCircle}>
            <Text style={styles.guessNumber}>99</Text>
          </View>
        </View>
        <View style={{ minHeight: 60, justifyContent: "center", alignItems: "center", width: "100%" }}>
          {reaction ? <DynamicReaction>{reaction}</DynamicReaction> : <Text style={styles.headerText}>Is This Your Number?</Text>}
        </View>
        <View style={styles.controlsContainer}>
          <View style={styles.hintTextContainer}>
            <Text style={styles.hintText}>Tell Rango...</Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton label="Lower" onPress={() => {}} containerStyle={styles.actionButtonContainer} icon={{ icon: "arrow-down" }} />
            <PrimaryButton label="Higher" onPress={handleLying} containerStyle={styles.actionButtonContainer} icon={{ icon: "arrow-up" }} />
          </View>
        </View>
      </View>
    </GameWrapper>
  );
}

export default PlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerText: {
    fontSize: FontSize.extraLarge,
    color: Colors.text,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: Colors.primaryDark,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: 300,
    height: 300,
  },
  glassCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: Colors.glassBorder,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  guessNumber: {
    fontSize: 100,
    fontWeight: "bold",
    color: Colors.textHighlight,
    textShadowColor: Colors.primaryDark,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  controlsContainer: {
    width: "100%",
    gap: 24,
    paddingBottom: 24,
  },
  hintTextContainer: {
    alignItems: "center",
  },
  hintText: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    marginBottom: -20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    width: "100%",
  },
  actionButtonContainer: {
    flex: 1,
  },
});
