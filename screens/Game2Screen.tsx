import { useState } from "react";
import { UserNumberEnteringScreen } from "../components/screens/Game2/UserNumberEnterScreen";
import OptionSelectingScreen from "../components/screens/Game2/OptionSelectingScreen";
import PlayingScreen from "../components/screens/Game2/PlayingScreen";
import { AppState } from "../App";

interface Props {
  onAppStateChange: (state: AppState) => void;
}

function Game2Screen({ onAppStateChange }: Props) {
  type GameState = "user_number_entering" | "option_selecting" | "playing";
  const [gameState, setGameState] = useState<GameState>("user_number_entering");

  const renderScreen = () => {
    switch (gameState) {
      case "user_number_entering":
        return (
          <UserNumberEnteringScreen
            onContinue={() => setGameState("option_selecting")}
            onGoingBack={() => onAppStateChange("game_mode_select")}
          />
        );
      case "option_selecting":
        return (
          <OptionSelectingScreen
            onContinue={() => setGameState("playing")}
            onGoingBack={() => setGameState("user_number_entering")}
          />
        );
      case "playing":
        return (
          <PlayingScreen
            onPause={() => setGameState("option_selecting")}
            onPlay={() => setGameState("playing")}
          />
        );
      default:
        return null;
    }
  };
  return renderScreen();
}

export default Game2Screen;
