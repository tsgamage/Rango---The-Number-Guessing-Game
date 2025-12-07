import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ScreenHeader from "../../ui/ScreenHeader";
import ScreenWrapper from "../../ui/ScreenWrapper";
import PrimaryButton from "../../ui/PrimaryButton";
import DynamicReaction from "../../ui/DynamicReaction";
import { getRandomItem } from "../../../utils/utils";
import { FontSize, Colors } from "../../../constants/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Game1StackParamList } from "../../../screens/Game1Screen";
import { useAppDispatch } from "../../../store/hooks";
import { game1Actions, Game1Attempts, Game1MaxNumber } from "../../../store/slice/game1.slice";

type Props = NativeStackScreenProps<Game1StackParamList, "OptionSelecting">;

function OptionSelectingScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();

  type NumberRangeLabel = "Easy" | "Medium" | "Hard";
  type NumberRangeDescription = "1- 20" | "1- 50" | "1- 100";
  const numberRangeOptions: { label: NumberRangeLabel; description: NumberRangeDescription }[] = [
    { label: "Easy", description: "1- 20" },
    { label: "Medium", description: "1- 50" },
    { label: "Hard", description: "1- 100" },
  ];
  type AttempsOptions = "5" | "10" | "15";
  const attemptsOptions: AttempsOptions[] = ["5", "10", "15"];

  const [numberRangeOption, setNumberRangeOption] = useState<NumberRangeLabel>("Easy");
  const [attemptsOption, setAttemptsOption] = useState<AttempsOptions>("15");

  const handleNumberRangeOptionChange = (option: NumberRangeLabel) => {
    setNumberRangeOption(option);
  };

  const handleStartGame = () => {
    let maxNumber: Game1MaxNumber = 20;
    if (numberRangeOption === "Medium") maxNumber = 50;
    if (numberRangeOption === "Hard") maxNumber = 99;
    dispatch(game1Actions.setMaxNumber(maxNumber));
    dispatch(game1Actions.setAttempts(Number.parseInt(attemptsOption) as Game1Attempts));
    navigation.navigate("Play");
  };

  const dynamicReactionTexts = ["Let's Go", "Ready", "Let's Play"];

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader>Customize Your Challenge</ScreenHeader>
        <View>
          <ScreenHeader style={styles.optionHeaderContainer} headerStyle={styles.optionHeader} headerSize="small">
            Number Range:
          </ScreenHeader>
          <View style={styles.numberRangeOptionButtonsContainer}>
            {numberRangeOptions.map((option) => (
              <PrimaryButton
                label={option.label}
                key={option.label}
                descriptionStyle={styles.rangeButtonDescription}
                description={numberRangeOption === option.label ? option.description : ""}
                isSelected={numberRangeOption === option.label}
                onSelect={() => handleNumberRangeOptionChange(option.label)}
                buttonContainerStyle={{
                  paddingVertical: 15,
                }}
              />
            ))}
          </View>
        </View>
        <View>
          <ScreenHeader style={styles.optionHeaderContainer} headerStyle={styles.optionHeader} headerSize="small">
            Attempts:
          </ScreenHeader>
          <View style={styles.chanceOptionButtonsContainer}>
            {attemptsOptions.map((option) => (
              <PrimaryButton
                containerStyle={{ flex: 1 }}
                label={option}
                isSelected={attemptsOption === option}
                onSelect={() => setAttemptsOption(option)}
                key={option}
                buttonContainerStyle={{
                  paddingHorizontal: 0,
                  paddingVertical: 8,
                }}
              />
            ))}
          </View>
        </View>
        <View>
          <PrimaryButton label="Let's Go" onPress={handleStartGame} icon={{ icon: "arrow-forward" }} />
          <DynamicReaction>{getRandomItem(dynamicReactionTexts)}</DynamicReaction>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default OptionSelectingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  optionHeader: {
    textAlign: "left",
    color: Colors.text,
    fontWeight: "bold",
    fontSize: FontSize.medium,
  },
  optionHeaderContainer: {
    marginBottom: 10,
    alignItems: "flex-start",
  },
  numberRangeOptionButtonsContainer: {
    gap: 10,
  },
  chanceOptionButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  rangeButtonDescription: {
    textAlign: "center",
    fontSize: FontSize.small,
    color: Colors.textSecondary,
  },
});
