import { StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../GameMod/PrimaryButton";
import DynamicReaction from "../../ui/DynamicReaction";
import { getRandomItem } from "../../../utils/utils";
import { useState } from "react";
import ScreenHeader from "../../ui/ScreenHeader";
import { FontSize } from "../../../constants/theme";
import ScreenWrapper from "../../ui/ScreenWrapper";
import { Game2StackParamList } from "../../../screens/Game2Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<Game2StackParamList, "UserNumberEntering">;

export const UserNumberEnteringScreen = ({ navigation }: Props) => {
  const [userNumber, setUserNumber] = useState<string>("");

  const dynamicReactionTexts = [
    "I won't peek, I swear.",
    "This stays between you and me.",
    "I promise I won't peek.",
    "Only you know the truth",
    "I'll keep this absolutely secret",
  ];

  return (
    <ScreenWrapper>
      <View style={style.container}>
        <View>
          <ScreenHeader>Enter Your Secret Number</ScreenHeader>
          <ScreenHeader headerSize="small">Between 1 and 100</ScreenHeader>
        </View>
        <View style={style.inputContainer}>
          <TextInput style={style.input} keyboardType="numeric" value={userNumber} onChangeText={setUserNumber} maxLength={2} inputMode="numeric" />
          <PrimaryButton
            containerStyle={style.continueButtonContainer}
            buttonContainerStyle={style.continueButton}
            label="Continue"
            icon={{ icon: "arrow-forward" }}
            onPress={() => {
              navigation.navigate("Play");
            }}
          />
        </View>
        <DynamicReaction>{getRandomItem(dynamicReactionTexts)}</DynamicReaction>
      </View>
    </ScreenWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: FontSize.extraExtraLarge,
    textAlign: "center",
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 40,
    justifyContent: "space-between",
    width: "80%",
  },
  continueButtonContainer: {
    width: "100%",
  },
  continueButton: {
    paddingVertical: 10,
  },
});
