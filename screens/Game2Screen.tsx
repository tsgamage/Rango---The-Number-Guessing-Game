import { UserNumberEnteringScreen } from "../components/screens/Game2/UserNumberEnterScreen";
import OptionSelectingScreen from "../components/screens/Game2/OptionSelectingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayScreen from "../components/screens/Game2/PlayScreen";
import { Colors } from "../constants/theme";

export type Game2StackParamList = {
  UserNumberEntering: undefined;
  OptionSelecting: undefined;
  Play: undefined;
};

function Game2Screen() {
  const Game2Stack = createNativeStackNavigator<Game2StackParamList>();
  return (
    <Game2Stack.Navigator
      initialRouteName="UserNumberEntering"
      screenOptions={{ headerTransparent: true, headerTitle: "", headerTintColor: Colors.textSecondary }}
    >
      <Game2Stack.Screen name="UserNumberEntering" component={UserNumberEnteringScreen} />
      <Game2Stack.Screen name="OptionSelecting" component={OptionSelectingScreen} />
      <Game2Stack.Screen name="Play" component={PlayScreen} options={{ headerShown: false }} />
    </Game2Stack.Navigator>
  );
}
export default Game2Screen;
