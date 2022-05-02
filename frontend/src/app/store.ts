import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { stepsReducer } from "../features/steps/stepsSlice";
import { todosReducer } from "../features/todo/todosSlice";
import { sessionReducer, User } from "../features/user/sessionSlice";

interface WindowExtended extends Window {
  currentUser?: User;
}
let windowExtended: WindowExtended = window;

let preloadedState = undefined;
if (windowExtended.currentUser) {
  const sessionUser = windowExtended.currentUser;
  preloadedState = {
    session: {
      currentUser: sessionUser,
      status: "",
    },
  };
}

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    steps: stepsReducer,
    session: sessionReducer,
  },
  preloadedState: preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
