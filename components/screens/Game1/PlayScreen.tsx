import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../ui/PrimaryButton";
import { FontSize, Colors } from "../../../constants/theme";
import ScreenHeader from "../../ui/ScreenHeader";
import { Game1StackParamList } from "../../../screens/Game1Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { generateRandomNumber, getRandomItem } from "../../../utils/utils";
import { dynamicReactions } from "../../../data/dynamicReactions";
import { useState } from "react";
import DynamicReaction from "../../ui/DynamicReaction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ScreenWrapper from "../../ui/ScreenWrapper";

type Props = NativeStackScreenProps<Game1StackParamList, "Play">;

function PlayScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const maxNumber = useAppSelector((state) => state.game1.maxNumber);
  const initialAttempts = useAppSelector((state) => state.game1.attempts);

  const [usersGuess, setUsersGuess] = useState<string>("");
  const [reaction, setReaction] = useState<string>("");
  const [userGuesses, setUserGuesses] = useState<number[]>([]);
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, maxNumber));
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(initialAttempts);
  const [isGamePaused, setIsGamePaused] = useState(false);

  const [hint, setHint] = useState("Enter your guess");

  const restartGame = () => {
    setUsersGuess("");
    setReaction("");
    setHint("Enter your guess");
    setUserGuesses([]);
    setTargetNumber(generateRandomNumber(1, maxNumber));
    setRemainingAttempts(initialAttempts);
  };

  const renderUserGuesses = () => {
    // Show last 5 guesses
    const prevGuesses = [...userGuesses].slice(-5);

    if (prevGuesses.length === 0) return null;

    return (
      <View>
        <Text style={styles.historyLabel}>Recent Guesses</Text>
        <View style={styles.userGuessesContainer}>
          {prevGuesses.map((guess, index) => (
            <View key={index} style={styles.historyRow}>
              <View style={styles.historyPill}>
                <Text style={styles.historyText}>{guess}</Text>
              </View>
              {index < prevGuesses.length - 1 && <Ionicons name="arrow-forward" size={16} color={Colors.glassBorder} />}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const onGuessPress = () => {
    if (usersGuess === "") return;
    const guessNum = parseInt(usersGuess);
    if (isNaN(guessNum)) return;

    console.log("Guess Number: ", guessNum);
    console.log("Target Number: ", targetNumber);

    setUserGuesses((prev) => [...prev, guessNum]);

    const guessNumber = parseInt(usersGuess);
    const tooFar = Math.abs(guessNumber - targetNumber) > 50;
    const tooHigh = guessNumber > targetNumber && Math.abs(guessNumber - targetNumber) > 20;
    const tooLow = guessNumber < targetNumber && Math.abs(guessNumber - targetNumber) > 20;
    const high = guessNumber > targetNumber;
    const low = guessNumber < targetNumber;
    const close = Math.abs(guessNumber - targetNumber) <= 5;

    // Reset input
    setUsersGuess("");

    if (guessNumber === targetNumber) {
      Alert.alert("Victory!", getRandomItem(dynamicReactions.userWon), [
        { text: "Play Again", onPress: () => restartGame() },
        { text: "Exit", onPress: () => navigation.goBack() },
      ]);
    } else {
      if (remainingAttempts !== null) {
        setRemainingAttempts((prev) => prev! - 1);
      }
      if (tooFar) {
        setReaction(getRandomItem(dynamicReactions.guessTooFar));
        setHint(`${guessNumber} is Way off!`);
      } else if (tooHigh) {
        setReaction(getRandomItem(dynamicReactions.guessTooHigh));
        setHint(`${guessNumber} is Too High`);
      } else if (tooLow) {
        setReaction(getRandomItem(dynamicReactions.guessTooLow));
        setHint(`${guessNumber} is Too Low`);
      } else if (high) {
        setReaction(close ? getRandomItem(dynamicReactions.guessTooClose) : getRandomItem(dynamicReactions.guessTooHigh));
        setHint(`${guessNumber} is High`);
      } else if (low) {
        setReaction(close ? getRandomItem(dynamicReactions.guessTooClose) : getRandomItem(dynamicReactions.guessTooLow));
        setHint(`${guessNumber} is Low`);
      }
      if (remainingAttempts === 1) {
        Alert.alert("Game Over!", getRandomItem(dynamicReactions.userLost), [
          { text: "Play Again", onPress: () => restartGame() },
          { text: "Change Settings", onPress: () => navigation.goBack() },
          { text: "Exit", onPress: () => navigation.popToTop() },
        ]);
      }
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
          <ScreenHeader>Guess My Number</ScreenHeader>

          <View style={styles.container}>
            {/* Dynamic Reaction (Flavor Text) at Top */}
            <View style={{ minHeight: 50, justifyContent: "center" }}>{reaction ? <DynamicReaction>{reaction}</DynamicReaction> : null}</View>

            {/* Attempts Count */}
            {initialAttempts != null && (
              <View style={styles.attemptsContainer}>
                <Text style={styles.attemptsText}>
                  {remainingAttempts} {remainingAttempts === 1 ? "Attempt" : "Attempts"} Remaining
                </Text>
              </View>
            )}

            {/* Glass Card Input Area */}
            <View style={styles.glassCard}>
              {/* Hint (Instruction) above Input */}
              <Text style={styles.hintText}>{hint}</Text>
              <TextInput
                style={styles.input}
                placeholder="?"
                placeholderTextColor={Colors.glassBorder}
                keyboardType="numeric"
                inputMode="numeric"
                value={usersGuess}
                onChangeText={(text) => setUsersGuess(text)}
                maxLength={2}
              />

              <PrimaryButton
                label="GUESS"
                onPress={onGuessPress}
                disabled={usersGuess.trim() === "" || Number(usersGuess) < 1 || isNaN(Number(usersGuess))}
                containerStyle={styles.submitButtonContainer}
                buttonTextStyle={{ fontSize: 18, fontWeight: "bold" }}
              />
            </View>

            {/* History Below */}
            {renderUserGuesses()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

export default PlayScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  glassCard: {
    backgroundColor: Colors.glass,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: "center",
    gap: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryLight,
    fontSize: 64, // HUGE input
    color: Colors.text,
    textAlign: "center",
    width: "100%",
    fontWeight: "800",
    paddingVertical: 10,
  },
  submitButtonContainer: {
    width: "100%",
  },
  historyLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.small,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  userGuessesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  historyPill: {
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  historyText: {
    color: Colors.textSecondary,
    fontSize: FontSize.small,
    fontWeight: "600",
  },
  hintText: {
    color: Colors.textHighlight, // Use highlight color for importance
    fontSize: FontSize.medium,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  attemptsContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  attemptsText: {
    color: Colors.textSecondary,
    fontSize: FontSize.small,
    fontWeight: "600",
  },
});
