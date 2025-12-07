import { StatusBar } from "expo-status-bar";
import GameModeSelectScreen from "./screens/GameModeSelectScreen";
import Game1Screen from "./screens/Game1Screen";
import Game2Screen from "./screens/Game2Screen";
import Game3Screen from "./screens/Game3Screen";
import WinScreen from "./screens/WinScreen";
import LooseScreen from "./screens/LooseScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  Welcome: undefined;
  GameModeSelect: undefined;
  Game1: undefined;
  Game2: undefined;
  Game3: undefined;
  Win: undefined;
  Loose: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerTransparent: true, headerTitle: "", headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="GameModeSelect" component={GameModeSelectScreen} />
          <Stack.Screen name="Game1" component={Game1Screen} />
          <Stack.Screen name="Game2" component={Game2Screen} />
          <Stack.Screen name="Game3" component={Game3Screen} />
          <Stack.Screen name="Win" component={WinScreen} />
          <Stack.Screen name="Loose" component={LooseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
