import { Alert, StyleSheet, Text, View } from "react-native";
import GameWrapper from "../../ui/GameWrapper";
import ScreenHeader from "../../ui/ScreenHeader";
import PrimaryButton from "../GameMod/PrimaryButton";
import DynamicReaction from "../../ui/DynamicReaction";
import { FontSize } from "../../../constants/theme";
import { pickRandomIndex } from "../../../utils/utils";

interface Props {
  onPlay: () => void;
  onPause: () => void;
}

function PlayingScreen({ onPlay, onPause }: Props) {
  const dynamicLieMessages = [
    "You are not telling the truth",
    "Why bullying the app huh",
    "I'm not dumb you know",
    "Someone is cheatinggg",
    "Stop trolling me",
  ];

  return (
    <GameWrapper onPlay={onPlay} onPause={onPause}>
      <View style={styles.container}>
        <View style={styles.guessContainer}>
          <View style={styles.guessTextContainer}>
            <Text style={styles.guessText}>Is This Your Number?</Text>
            <View style={styles.guessNumberContainer}>
              <Text style={styles.guessNumber}>99</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.guessText}>How close am I?</Text>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                label="Lower"
                onPress={onPlay}
                containerStyle={styles.buttonContainer}
                buttonContainerStyle={styles.button}
                icon={{ icon: "arrow-down" }}
              />
              <PrimaryButton
                label="Higher"
                onPress={() =>
                  Alert.alert(
                    "Don't Lie to me...",
                    dynamicLieMessages[pickRandomIndex(dynamicLieMessages)],
                    [{ text: "Sorry", onPress: () => {} }]
                  )
                }
                containerStyle={styles.buttonContainer}
                buttonContainerStyle={styles.button}
                icon={{ icon: "arrow-up" }}
              />
            </View>
          </View>
        </View>
      </View>
    </GameWrapper>
  );
}

export default PlayingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomContainer: {
    alignItems: "center",
  },
  guessTextContainer: {
    alignItems: "center",
  },
  guessText: {
    fontSize: FontSize.large,
    marginVertical: 10,
  },
  guessNumberContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: "100%",
    backgroundColor: "white",
  },
  guessNumber: {
    fontSize: FontSize.superLarge,
  },
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    paddingVertical: 10,
  },
  guessContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});
