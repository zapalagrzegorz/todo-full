import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ToDoItemI {
  id: number;
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

const initialState = {
  ids: [1, 2],
  entities: {
    1: {
      id: 1,
      title: "wash car",
      body: "with soap",
      done: false,
    },
    2: {
      id: 2,
      title: "wash dog",
      body: "with shampoo",
      done: true,
    },
  },
};

export interface TodoState {
  [index: number]: ToDoItemI;
}

const todosAdapter = createEntityAdapter<ToDoItemI>();
// const stepsAdapter = createEntityAdapter<ToDoItemStep>();
type FetchingStatus = "idle" | "loading" | "succeeded" | "failed";

interface ExtendedEntityAdapterState {
  status: FetchingStatus;
}

let initialStateTyped: ExtendedEntityAdapterState = {
  ...(initialState as EntityState<ToDoItemI>),
  status: "idle",
};
const initialTodos = todosAdapter.getInitialState(initialStateTyped);

const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodos,
  reducers: {
    // Do not merge the old todos state with the new todos coming in
    receiveTodos: (state, { payload }) => {
      todosAdapter.setAll(state, payload);
    },
    receiveTodo: (state, action) => {
      // upsertOne: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
      // const payload = action.payload;
      // const { todoId, changedTodo } = payload;
      // const todo = state.entities[todoId];
      // todo
      // if (todo) {
      todosAdapter.upsertOne(state, action);
      // }
    },
    removeTodo: (state, action) => {
      todosAdapter.removeOne(state, action);
    },
  },
});

const req = { url: "https://example.com", method: "GET" } as const;

export const { receiveTodo, receiveTodos, removeTodo } = todosSlice.actions;

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
