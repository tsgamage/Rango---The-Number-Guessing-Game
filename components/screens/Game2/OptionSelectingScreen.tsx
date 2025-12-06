import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ScreenHeader from "../../ui/ScreenHeader";
import ScreenWrapper from "../../ui/ScreenWrapper";
import PrimaryButton from "../GameMod/PrimaryButton";
import DynamicReaction from "../../ui/DynamicReaction";
import { pickRandomIndex } from "../../../utils/utils";

function OptionSelectingScreen() {
  // easy: 1- 20
  // medium: 1- 50
  // hard: 1- 100
  type NumberRangeOptions = "Easy" | "Medium" | "Hard";
  const numberRangeOptions: NumberRangeOptions[] = ["Easy", "Medium", "Hard"];

  type ChanceOptions = "10" | "15" | "20";
  const chanceOptions: ChanceOptions[] = ["10", "15", "20"];

  const [numberRangeOption, setNumberRangeOption] = useState<NumberRangeOptions>("Easy");
  const [chanceOption, setChanceOption] = useState<ChanceOptions>("20");

  const handleNumberRangeOptionChange = (option: NumberRangeOptions) => {
    setNumberRangeOption(option);
  };

  const handleChanceOptionChange = (option: ChanceOptions) => {
    setChanceOption(option);
  };

  const dynamicReactionTexts = ["Let's Go", "Ready", "Let's Play"];

  return (
    <ScreenWrapper>
      <ScreenHeader>Customize Your Challenge</ScreenHeader>
      <View style={styles.container}>
        <View>
          <ScreenHeader style={styles.optionHeaderContainer} headerStyle={styles.optionHeader} headerSize="small">
            Number Range:
          </ScreenHeader>
          <View style={styles.numberRangeOptionButtonsContainer}>
            {numberRangeOptions.map((option) => (
              <PrimaryButton
                label={option}
                key={option}
                isSelected={numberRangeOption === option}
                onSelect={() => handleNumberRangeOptionChange(option)}
                buttonContainerStyle={{
                  paddingVertical: 15,
                }}
              />
            ))}
          </View>
        </View>
        <View>
          <ScreenHeader style={styles.optionHeaderContainer} headerStyle={styles.optionHeader} headerSize="small">
            Chance:
          </ScreenHeader>
          <View style={styles.chanceOptionButtonsContainer}>
            {chanceOptions.map((option) => (
              <PrimaryButton
                containerStyle={{ flex: 1 }}
                label={option}
                isSelected={chanceOption === option}
                onSelect={() => handleChanceOptionChange(option)}
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
          <PrimaryButton label="Let's Go" onPress={() => {}} icon={{ icon: "arrow-forward" }} />
          <DynamicReaction>{dynamicReactionTexts[pickRandomIndex(dynamicReactionTexts)]}</DynamicReaction>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default OptionSelectingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  optionHeader: {
    textAlign: "left",
  },
  optionHeaderContainer: {
    marginBottom: 10,
  },
  numberRangeOptionButtonsContainer: {
    gap: 10,
  },
  chanceOptionButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
