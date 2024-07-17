import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface IUser {
  email: string;
  username: string;
  password: string;
  profilpicture?: string | null;
  bgpicture?: string | null;
  description?: string;
  followers?: any[];
  following?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface userState {
  currUser: IUser | object | boolean | null;
  loading: boolean | null;
  error: boolean | null;
  accCreated: boolean | null;
}



const initialState: userState = {
  currUser: null,
  loading: null,
  error: null,
  accCreated: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //request to start
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    //sign action
    signSuccess: (state) => {
      state.loading = false;
      state.accCreated = true;
    },
    signFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
        //login action
    loginSuccess: (state, action: PayloadAction<object | boolean>) => {
      state.loading = false;
      state.currUser = action.payload;
      state.accCreated = false;
      localStorage.setItem('user', JSON.stringify(action.payload));

    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.accCreated = false;
    },
            //logout

    logoutSuccess: (state) => {
      state.loading = false;
      state.currUser = null;
      localStorage.removeItem('user')
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
