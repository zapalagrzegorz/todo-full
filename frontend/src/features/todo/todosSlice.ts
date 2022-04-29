import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import * as TodoAPI from "./todoApi";
export interface IToDoItem {
  id: number;
  title: string;
  body: string;
  done: boolean;
  steps?: ToDoItemStep[];
}
export interface IToDoItemContent {
  title: string;
  body: string;
  done: boolean;
  steps?: ToDoItemStep[];
}

interface ToDoItemStep {
  todo_id: number;
  title: string;
  done: boolean;
}

// export interface TodoState {
//   [index: number]: IToDoItem;
// }

const todosAdapter = createEntityAdapter<IToDoItem>();
// const stepsAdapter = createEntityAdapter<ToDoItemStep>();
type FetchingStatus = "idle" | "loading" | "succeeded" | "failed";

interface ExtendedEntityAdapterState {
  status: FetchingStatus;
  error: string | null;
}

let initialStateTyped: ExtendedEntityAdapterState = {
  status: "idle",
  error: null,
};
const initialTodos = todosAdapter.getInitialState(initialStateTyped);

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  return await TodoAPI.fetchTodos();
});

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoItem: IToDoItemContent) => {
    return await TodoAPI.createTodo(todoItem);
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updateTodoItem: IToDoItem) => {
    return await TodoAPI.updateTodo(updateTodoItem);
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    return await TodoAPI.deleteTodo(id);
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodos,
  reducers: {
    // Do not merge the old todos state with the new todos coming in
    receiveTodos: (state, { payload }) => {
      todosAdapter.setAll(state, payload);
    },
    removeTodo: (state, action) => {
      todosAdapter.removeOne(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        todosAdapter.setAll(state, action);
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        todosAdapter.addOne(state, action);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        todosAdapter.upsertOne(state, action);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload.id);
      });
  },
});

const req = { url: "https://example.com", method: "GET" } as const;

export const { receiveTodos, removeTodo } = todosSlice.actions;

// memoized selectors
const todosAdapterSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todos
);

export const {
  selectAll: selectAllTodos,
  selectIds: selectAllTodoIds,
  selectById: selectTodoById,
} = todosAdapterSelectors;

export const todosReducer = todosSlice.reducer;
