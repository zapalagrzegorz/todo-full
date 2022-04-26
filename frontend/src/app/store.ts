import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { stepsReducer } from "../features/steps/stepsSlice";
import { todosReducer } from "../features/todo/todosSlice";


export const store = configureStore({
  reducer: {
    todos: todosReducer,
    steps: stepsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
