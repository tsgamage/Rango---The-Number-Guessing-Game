import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton, { IPrimaryButton } from "../GameMod/PrimaryButton";
import { Colors, FontSize } from "../../../constants/theme";
import { RootStackParamList } from "../../../App";
import DynamicReaction from "../../ui/DynamicReaction";
import ScreenHeader from "../../ui/ScreenHeader";
import { useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenWrapper from "../../ui/ScreenWrapper";
import { Game1StackParamList } from "../../../screens/Game1Screen";
import { getRandomItem } from "../../../utils/utils";

const descriptionTexts = ["Select how you want to challenge your brain", "Pick a style. Let's rumble!", "Choose your vibe for this round."];

type Props = NativeStackScreenProps<Game1StackParamList, "PlayStyleSelecting">;

function PlayStyleSelectingScreen({ navigation }: Props) {
  const [gameDescription, setGameDescription] = useState<{
    game: number;
    description: string;
  } | null>(null);
  const gameDescriptions = [
    {
      game: 1,
      description: "A relaxed guessing experience. No limits, no pressure. Just pure discovery",
    },
    {
      game: 2,
      description: "A competitive guessing experience. Beat the Rango in limited attempts!",
    },
  ];

  const dynamicReactionText = useMemo(() => {
    return getRandomItem(descriptionTexts);
  }, []);

  const gamemods: IPrimaryButton[] = [
    {
      label: "Zen Mode",
      onPress() {
        setGameDescription(gameDescriptions[0]);
      },
      onLongPress() {
        navigation.navigate("Play", {
          attempts: 999, // Essentially infinite for Zen Mode? Or just a high number
          maxNumber: 100,
        });
      },
    },
    {
      label: "Challenge Mode",
      onPress() {
        setGameDescription(gameDescriptions[1]);
      },
      onLongPress() {
        navigation.navigate("OptionSelecting");
      },
    },
  ];
  return (
    <ScreenWrapper
      style={{
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <View style={styles.headerContainer}>
        <ScreenHeader>Choose Your Game Mode</ScreenHeader>
        {gameDescription && <Text style={styles.modSelectHintText}>Press & Hold to select</Text>}
      </View>
      <View style={{ gap: 10 }}>
        {gamemods.map((gamemod, index) => (
          <PrimaryButton
            key={gamemod.label}
            {...gamemod}
            onPress={gamemod.onPress}
            onLongPress={gamemod.onLongPress}
            description={index + 1 === gameDescription?.game ? gameDescription?.description : ""}
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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Background handled by global App wrapper
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  modSelectHintText: {
    fontSize: FontSize.small,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 20, // Pill shape
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: Colors.glassBorder,
    backgroundColor: Colors.glass,
    color: Colors.textSecondary,
    overflow: "hidden",
    marginTop: 8,
  },
});

export default PlayStyleSelectingScreen;
