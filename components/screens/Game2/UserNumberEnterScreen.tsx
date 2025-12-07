import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, FontSize } from "../../../constants/theme";
import PrimaryButton from "../../ui/PrimaryButton";
import DynamicReaction from "../../ui/DynamicReaction";
import { getRandomItem } from "../../../utils/utils";
import { useEffect, useMemo, useState } from "react";
import ScreenHeader from "../../ui/ScreenHeader";
import ScreenWrapper from "../../ui/ScreenWrapper";
import { Game2StackParamList } from "../../../screens/Game2Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch } from "../../../store/hooks";
import { game2Actions } from "../../../store/slice/game2.slice";

type Props = NativeStackScreenProps<Game2StackParamList, "UserNumberEntering">;

export const UserNumberEnteringScreen = ({ navigation }: Props) => {
  const [userNumber, setUserNumber] = useState<string>("");
  const dispatch = useAppDispatch();

  const dynamicReactionTexts = [
    "I won't peek, I swear.",
    "This stays between you and me.",
    "I promise I won't peek.",
    "Only you know the truth",
    "I'll keep this absolutely secret",
  ];

  const dynamicReaction = useMemo(() => getRandomItem(dynamicReactionTexts), []);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={style.scrollView} contentContainerStyle={style.scrollViewContent} keyboardShouldPersistTaps="handled">
          <View style={style.container}>
            <View>
              <ScreenHeader style={style.header} headerSize="large">
                Enter Your Secret Number
              </ScreenHeader>
              <ScreenHeader headerStyle={style.subHeader} headerSize="small">
                Between 1 and 100
              </ScreenHeader>
            </View>
            <View style={style.glassCard}>
              <TextInput
                style={style.input}
                keyboardType="numeric"
                value={userNumber}
                onChangeText={setUserNumber}
                maxLength={2}
                inputMode="numeric"
                placeholder="?"
                placeholderTextColor={Colors.glassBorder}
              />
              <PrimaryButton
                containerStyle={style.continueButtonContainer}
                buttonContainerStyle={style.continueButton}
                label="Continue"
                icon={{ icon: "arrow-forward" }}
                onPress={() => {
                  if (userNumber.trim() === "") return;
                  if (Number(userNumber) < 1 || Number(userNumber) > 100) return;
                  if (isNaN(Number(userNumber))) return;
                  setUserNumber("");
                  dispatch(game2Actions.setUserNumber(Number(userNumber)));
                  navigation.navigate("Play");
                }}
                disabled={userNumber.trim() === "" || Number(userNumber) < 1 || Number(userNumber) > 100 || isNaN(Number(userNumber))}
              />
            </View>
            <DynamicReaction>{dynamicReaction}</DynamicReaction>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const style = StyleSheet.create({
  header: {
    marginBottom: -15,
  },
  subHeader: {
    color: Colors.textSecondary,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  glassCard: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.glassBorder,
    backgroundColor: Colors.glass,
    padding: 32,
    justifyContent: "center",
    width: "90%",
    maxWidth: 400,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryLight,
    padding: 10,
    marginBottom: 32,
    fontSize: 64, // Much larger font for the number
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.text,
    width: "100%",
    minHeight: 100,
  },
  continueButtonContainer: {
    width: "100%",
  },
  continueButton: {},
});
