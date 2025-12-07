import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import GameWrapper from "../../ui/GameWrapper";
import PrimaryButton from "../GameMod/PrimaryButton";
import { FontSize } from "../../../constants/theme";
import ScreenHeader from "../../ui/ScreenHeader";
import { Game1StackParamList } from "../../../screens/Game1Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { generateRandomNumber, getRandomItem } from "../../../utils/utils";
import { dynamicReactions } from "../../../data/dynamicReactions";
import { useState } from "react";
import DynamicReaction from "../../ui/DynamicReaction";

type Props = NativeStackScreenProps<Game1StackParamList, "Play">;

let randomNumber = generateRandomNumber(1, 99);

function PlayScreen({ navigation }: Props) {
  const [usersGuess, setUsersGuess] = useState<string>("");
  const [reaction, setReaction] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(10);
  const [userGuesses, setUserGuesses] = useState<number[]>([]);

  type HintType = "Enter your guess" | "Too Low" | "Too High" | "High" | "Low" | "Close" | "Too Far";
  const [hint, setHint] = useState<HintType>("Enter your guess");

  const restartGame = () => {
    setUsersGuess("");
    setReaction("");
    setHint("Enter your guess");
    setUserGuesses([]);
    setAttempts(10);
    randomNumber = generateRandomNumber(1, 99);
  };

  const renderUserGuesses = () => {
    const lastThreeGuesses = userGuesses.slice(-3);

    return (
      <View style={styles.userGuessesContainer}>
        {lastThreeGuesses.map((guess, index) => {
          return (
            <>
              <Text key={index}>{guess}</Text>
              {index < lastThreeGuesses.length - 1 && <Text>{"->"}</Text>}
            </>
          );
        })}
      </View>
    );
  };

  return (
    <GameWrapper onPlay={() => navigation.goBack()} onPause={() => navigation.goBack()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
          <ScreenHeader>I'm thinking of a number…</ScreenHeader>
          <ScreenHeader headerSize="small">Guess the number if you can</ScreenHeader>

          <View style={styles.container}>
            {/* <View><Text style={styles.attemptsText}>Remaining Attempts: 10</Text></View> */}
            <View style={styles.inputContainer}>
              <ScreenHeader headerSize="small">{userGuesses.slice(-1) + " is " + hint}</ScreenHeader>
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                keyboardType="numeric"
                inputMode="numeric"
                value={usersGuess}
                onChangeText={(text) => setUsersGuess(text)}
                maxLength={2}
              />
              <PrimaryButton
                label="Guess"
                containerStyle={{ width: "100%" }}
                buttonStyle={styles.submitButton}
                buttonContainerStyle={styles.submitButtonContainer}
                disabled={usersGuess === ""}
                onPress={() => {
                  if (usersGuess === "") return;
                  setUserGuesses((prev) => [...prev, parseInt(usersGuess)]);
                  const guessNumber = parseInt(usersGuess);
                  const tooFar = Math.abs(guessNumber - randomNumber) > 50;
                  const tooHigh = guessNumber > randomNumber && Math.abs(guessNumber - randomNumber) > 20;
                  const tooLow = guessNumber < randomNumber && Math.abs(guessNumber - randomNumber) > 20;
                  const high = guessNumber > randomNumber;
                  const low = guessNumber < randomNumber;
                  const close = Math.abs(guessNumber - randomNumber) <= 5;

                  if (tooFar) {
                    setReaction(getRandomItem(dynamicReactions.guessTooFar));
                    setHint("Too Far");
                    setUsersGuess("");
                  } else if (tooHigh) {
                    setReaction(getRandomItem(dynamicReactions.guessTooHigh));
                    setHint("Too High");
                    setUsersGuess("");
                  } else if (tooLow) {
                    setReaction(getRandomItem(dynamicReactions.guessTooLow));
                    setUsersGuess("");
                    setHint("Too Low");
                  } else if (high) {
                    if (close) {
                      setReaction(getRandomItem(dynamicReactions.guessTooClose));
                    } else {
                      setReaction(getRandomItem(dynamicReactions.guessTooHigh));
                    }
                    setHint("High");
                    setUsersGuess("");
                  } else if (low) {
                    if (close) {
                      setReaction(getRandomItem(dynamicReactions.guessTooClose));
                    } else {
                      setReaction(getRandomItem(dynamicReactions.guessTooLow));
                    }
                    setHint("Low");
                    setUsersGuess("");
                  } else if (guessNumber === randomNumber) {
                    Alert.alert("You Won", getRandomItem(dynamicReactions.userWon), [
                      { text: "Play Again", onPress: () => restartGame() },
                      { text: "Exit", onPress: () => navigation.goBack() },
                    ]);
                  }
                }}
              />
              {reaction && <DynamicReaction>{reaction}</DynamicReaction>}
              <Text>{renderUserGuesses()}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GameWrapper>
  );
}

export default PlayScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    fontSize: FontSize.extraLarge,
    color: "black",
    textAlign: "center",
    width: "100%",
  },
  inputContainer: {
    gap: 10,
    backgroundColor: "whitesmoke",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
  },
  submitButtonContainer: {
    paddingVertical: 10,
    width: "100%",
  },
  submitButton: {
    width: "100%",
  },
  userGuessesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
