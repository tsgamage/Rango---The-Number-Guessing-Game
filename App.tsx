import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "./components/ui/ScreenWrapper";
import GameModeSelectScreen from "./screens/GameModeSelectScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Game1Screen from "./screens/Game1Screen";
import Game2Screen from "./screens/Game2Screen";
import Game3Screen from "./screens/Game3Screen";
import WinScreen from "./screens/WinScreen";
import LooseScreen from "./screens/LooseScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export type AppState =
  | "welcome"
  | "game_mode_select"
  | "game_1"
  | "game_2"
  | "game_3"
  | "win"
  | "loose";

export default function App() {
  const [appState, setAppState] = useState<AppState>("welcome");

  const renderScreen = () => {
    switch (appState) {
      case "welcome":
        return <WelcomeScreen onContinue={setAppState} />;
      case "game_mode_select":
        return <GameModeSelectScreen onGamemodChange={setAppState} />;
      case "game_1":
        return <Game1Screen />;
      case "game_2":
        return <Game2Screen onAppStateChange={setAppState} />;
      case "game_3":
        return <Game3Screen />;
      case "win":
        return <WinScreen />;
      case "loose":
        return <LooseScreen />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{renderScreen()}</View>
    </SafeAreaProvider>
  );
}
