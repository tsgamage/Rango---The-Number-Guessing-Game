import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayStyleSelectingScreen from "../components/screens/Game1/PlayStyleSelectingScreen";
import OptionSelectingScreen from "../components/screens/Game1/OptionSelectingScreen";
import PlayScreen from "../components/screens/Game1/PlayScreen";

export type Game1StackParamList = {
  PlayStyleSelecting: undefined;
  OptionSelecting: undefined;
  Play: undefined;
};

function Game1Screen() {
  const Game1Stack = createNativeStackNavigator<Game1StackParamList>();
  return (
    <Game1Stack.Navigator initialRouteName="PlayStyleSelecting" screenOptions={{ headerTransparent: true, headerTitle: "" }}>
      <Game1Stack.Screen name="PlayStyleSelecting" component={PlayStyleSelectingScreen} />
      <Game1Stack.Screen name="OptionSelecting" component={OptionSelectingScreen} />
      <Game1Stack.Screen name="Play" component={PlayScreen} options={{ headerShown: false }} />
    </Game1Stack.Navigator>
  );
}
export default Game1Screen;
