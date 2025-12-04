import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton, {
  IPrimaryButton,
} from "../components/screens/GameMod/PrimaryButton";
import { Colors, FontSize } from "../constants/theme";
import { AppState } from "../App";
import { pickRandomIndex } from "../utils/utils";
import DynamicReaction from "../components/ui/DynamicReaction";
import ScreenHeader from "../components/ui/ScreenHeader";
import { useMemo, useState } from "react";

const descriptionTexts = [
  "Select how you want to challenge your brain",
  "Pick a style. Let's rumble!",
  "Choose your vibe for this round.",
];

interface Props {
  onGamemodChange: (state: AppState) => void;
}

function GameModeSelectScreen({ onGamemodChange }: Props) {
  const [gameDescription, setGameDescription] = useState<{
    game: number;
    description: string;
  } | null>(null);

  const gameDescriptions = [
    {
      game: 1,
      description:
        "You'll guess the number the phone is thinking of. Beat it in limited attempts!",
    },
    {
      game: 2,
      description:
        "Enter your number and let the phone try to guess it in limited attempts!",
    },
    {
      game: 3,
      description:
        "You and the phone take turns guessing. First to reach the score wins.",
    },
  ];

  const dynamicReactionText = useMemo(() => {
    return descriptionTexts[pickRandomIndex(descriptionTexts)];
  }, []);

  const gamemods: IPrimaryButton[] = [
    {
      label: "I Will Guess",
      onPress() {
        setGameDescription(gameDescriptions[0]);
      },
      onLongPress() {
        onGamemodChange("game_1");
      },
    },
    {
      label: "Phone Will Guess",
      onPress() {
        setGameDescription(gameDescriptions[1]);
      },
      onLongPress() {
        onGamemodChange("game_2");
      },
    },
    {
      label: "Guessing Battle",
      onPress() {
        setGameDescription(gameDescriptions[2]);
      },
      onLongPress() {
        onGamemodChange("game_3");
      },
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <View style={styles.headerContainer}>
        <ScreenHeader>Choose Your Game Mode</ScreenHeader>
        {gameDescription && (
          <Text style={styles.modSelectHintText}>Press & Hold to select</Text>
        )}
      </View>
      <View style={{ gap: 10 }}>
        {gamemods.map((gamemod, index) => (
          <PrimaryButton
            key={gamemod.label}
            {...gamemod}
            onPress={gamemod.onPress}
            onLongPress={gamemod.onLongPress}
            description={
              index + 1 === gameDescription?.game
                ? gameDescription?.description
                : ""
            }
            descriptionStyle={{
              fontSize: FontSize.extraSmall,
              textAlign: "center",
            }}
            icon={{
              visible: gameDescription?.game !== index + 1,
              icon: "arrow-forward",
            }}
            iconStyle={{
              position: "absolute",
              right: 0,
            }}
          />
        ))}
      </View>
      <DynamicReaction>{dynamicReactionText}</DynamicReaction>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modSelectHintText: {
    fontSize: FontSize.small,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#00000050",
  },
});

export default GameModeSelectScreen;
