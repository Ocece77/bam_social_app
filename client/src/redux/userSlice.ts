import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  currUser: object | boolean | null;
  loading: boolean | null;
  error: boolean | null;
  accCreated: boolean | null;
}

const initialState: State = {
  currUser: null,
  loading: null,
  error: null,
  accCreated: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signSuccess: (state) => {
      state.loading = false;
      state.accCreated = true;
    },
    signFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    loginSuccess: (state, action: PayloadAction<object | boolean>) => {
      state.loading = false;
      state.currUser = action.payload;
      state.accCreated = false;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.accCreated = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currUser = null;
    },
    logoutFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  signSuccess,
  signFailed,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
} = userSlice.actions;

export default userSlice.reducer;
