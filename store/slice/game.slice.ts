import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    userScore: 0,
    appScore: 0,
    totalUserGuesses: 0,
    totalAppGuesses: 0,
    correctUserGuesses: 0,
    correctAppGuesses: 0,
    totalGamesPlayed: 0,
  },
  reducers: {
    setUserScore: (state, action: PayloadAction<number>) => {
      state.userScore = action.payload;
    },
    setAppScore: (state, action: PayloadAction<number>) => {
      state.appScore = action.payload;
    },
    setTotalUserGuesses: (state, action: PayloadAction<number>) => {
      state.totalUserGuesses = action.payload;
    },
    setTotalAppGuesses: (state, action: PayloadAction<number>) => {
      state.totalAppGuesses = action.payload;
    },
    setCorrectUserGuesses: (state, action: PayloadAction<number>) => {
      state.correctUserGuesses = action.payload;
    },
    setCorrectAppGuesses: (state, action: PayloadAction<number>) => {
      state.correctAppGuesses = action.payload;
    },
    setTotalGamesPlayed: (state, action: PayloadAction<number>) => {
      state.totalGamesPlayed = action.payload;
    },
  },
});
