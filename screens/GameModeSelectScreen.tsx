import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton, { IPrimaryButton } from "../components/screens/GameMod/PrimaryButton";
import { Colors, FontSize } from "../constants/theme";
import { RootStackParamList } from "../App";
import { getRandomItem } from "../utils/utils";
import DynamicReaction from "../components/ui/DynamicReaction";
import ScreenHeader from "../components/ui/ScreenHeader";
import { useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

const descriptionTexts = [
  "Select how you want to challenge your brain",
  "Pick a style. Let's rumble!",
  "Choose your vibe for this round.",
  "Ready to test your intuition?",
];

type Props = NativeStackScreenProps<RootStackParamList, "GameModeSelect">;

function GameModeSelectScreen({ navigation }: Props) {
  const [gameDescription, setGameDescription] = useState<{
    game: number;
    description: string;
  } | null>(null);
  const gameDescriptions = [
    {
      game: 1,
      description: "You'll guess the number the Rango is thinking of. Beat it in limited attempts!",
    },
    {
      game: 2,
      description: "Guide Rango with your hints and watch how efficiently it can track down your number.",
    },
    {
      game: 3,
      description: "Face off against Rango in alternating rounds. Outthink, outrun, and outguess.",
    },
  ];

  const dynamicReactionText = useMemo(() => {
    return getRandomItem(descriptionTexts);
  }, []);

  const gamemods: IPrimaryButton[] = [
    {
      label: "I Will Guess",
      onPress() {
        setGameDescription(gameDescriptions[0]);
      },
      onLongPress() {
        navigation.navigate("Game1");
      },
      description: gameDescriptions[0].description,
    },
    {
      label: "Rango Will Guess",
      onPress() {
        setGameDescription(gameDescriptions[1]);
      },
      onLongPress() {
        navigation.navigate("Game2");
      },
      description: gameDescriptions[1].description,
    },
    {
      label: "Guessing Battle",
      onPress() {
        setGameDescription(gameDescriptions[2]);
      },
      onLongPress() {
        navigation.navigate("Game3");
      },
      description: gameDescriptions[2].description,
    },
  ];

  return (
    <LinearGradient colors={Colors.gradients.primary as any} style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <ScreenHeader>Choose Your Game Mode</ScreenHeader>
          <View style={styles.hintContainer}>
            <Text style={styles.modSelectHintText}>Press & Hold to select</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {gamemods.map((gamemod, index) => (
            <PrimaryButton
              key={gamemod.label}
              {...gamemod}
              onPress={gamemod.onPress}
              onLongPress={gamemod.onLongPress}
              // Only show description if selected
              description={index + 1 === gameDescription?.game ? gameDescription?.description : undefined}
              icon={{
                visible: gameDescription?.game !== index + 1,
                icon: "arrow-forward",
                position: "right",
              }}
            />
          ))}
        </View>

        <View style={styles.footerContainer}>
          <DynamicReaction>{dynamicReactionText}</DynamicReaction>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  hintContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  modSelectHintText: {
    fontSize: FontSize.small,
    textAlign: "center",
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  buttonsContainer: {
    gap: 16,
    width: "100%",
    paddingHorizontal: 10,
  },
  footerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
});

export default GameModeSelectScreen;
