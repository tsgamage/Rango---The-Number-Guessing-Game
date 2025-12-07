import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  userNumber: number;
}

const initialState: InitialState = {
  userNumber: 0,
};

const Game2Slice = createSlice({
  name: "game2",
  initialState,
  reducers: {
    setUserNumber: (state, action: PayloadAction<InitialState["userNumber"]>) => {
      state.userNumber = action.payload;
    },
  },
});

export const game2Actions = Game2Slice.actions;
export default Game2Slice.reducer;
