import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Game1GameStyle = "zen" | "challenge";
export type Game1MaxNumber = 20 | 50 | 99;
export type Game1Attempts = 5 | 10 | 15 | null;

interface InitialState {
  gameStyle: Game1GameStyle;
  maxNumber: Game1MaxNumber;
  attempts: Game1Attempts;
}

const initialState: InitialState = {
  gameStyle: "zen",
  maxNumber: 99,
  attempts: null,
};

const Game1Slice = createSlice({
  name: "game1",
  initialState,
  reducers: {
    setGameStyle: (state, action: PayloadAction<InitialState["gameStyle"]>) => {
      state.gameStyle = action.payload;
    },
    setMaxNumber: (state, action: PayloadAction<InitialState["maxNumber"]>) => {
      state.maxNumber = action.payload;
    },
    setAttempts: (state, action: PayloadAction<InitialState["attempts"]>) => {
      state.attempts = action.payload;
    },
  },
});

export const game1Actions = Game1Slice.actions;
export default Game1Slice.reducer;
