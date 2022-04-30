import {
  createEntityAdapter,
  createSelector,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import * as stepAPI from "../steps/stepsApi";
import { IUserForm } from "./LoginForm";
import { createUser, loginUser } from "./sessionApi";

export interface IToDoItemStepContent {
  todo_id: number;
  title: string;
  done: boolean;
  body: string;
}

export interface ToDoItemStep extends IToDoItemStepContent {
  id: number;
}

export interface StepsState {
  [index: number]: ToDoItemStep;
}

// const stepsAdapter = createEntityAdapter<ToDoItemStep>();

export const createStep = createAsyncThunk(
  "steps/addStep",
  async (stepBody: IToDoItemStepContent) => {
    return await stepAPI.createStep(stepBody);
  }
);

export interface User {
  id: number;
  username: string;
}

interface ISessionState {
  currentUser: User | null;
}

const initialState: ISessionState = {
  currentUser: null,
};

export const loginUserThunk = createAsyncThunk(
  "users/login",
  async (userForm: IUserForm) => {
    const response = await loginUser(userForm);
    return response;
  }
);

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
    receiveCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    logoutCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { receiveCurrentUser } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
