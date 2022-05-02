import {
  createEntityAdapter,
  createSelector,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import * as stepAPI from "../steps/stepsApi";
import { IUserForm } from "./LoginForm";
import { createUser, loginUser, logoutUser } from "./sessionApi";

const _nullSession = {
  currentUser: null,
};

export interface User {
  id: number;
  username: string;
}

export interface ISessionState {
  currentUser: User | null;
  status: string;
}

const initialState: ISessionState = {
  currentUser: null,
  // currentUser: {
  //   username: "Gelo",
  //   id: 1,
  // },
  status: "",
};

export const loginUserThunk = createAsyncThunk(
  "users/login",
  async (userForm: IUserForm) => {
    const response = await loginUser(userForm);
    return response;
  }
);

export const logoutUserThunk = createAsyncThunk("users/logout", async () => {
  const response = await logoutUser();
  return response;
});

export const signupUserThunk = createAsyncThunk(
  "users/signup",
  async (userForm: IUserForm) => {
    const response = await createUser(userForm);
    return response;
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    clearStatus(state) {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.currentUser = null;
        state.status = action.payload.message;
        // cannot replace state state = _nullSession
      });
  },
});

export const { clearStatus } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
