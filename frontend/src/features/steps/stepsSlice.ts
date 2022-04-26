import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ToDoItemStep {
  id: number;
  todo_id: number;
  title: string;
  done: boolean;
  body: string;
}

const initialSteps: EntityState<ToDoItemStep> = {
  ids: [1, 2],
  entities: {
    1: {
      id: 1,
      todo_id: 1,
      title: "buy soap",
      body: "at leclerc Sonamax",
      done: false,
    },
    2: {
      id: 2,
      todo_id: 1,
      title: "prepare water",
      body: "check rubber pipe at home",
      done: false,
    },
  },
};

export interface StepsState {
  [index: number]: ToDoItemStep;
}

const stepsAdapter = createEntityAdapter<ToDoItemStep>();

const stepsSlice = createSlice({
  name: "steps",
  initialState: stepsAdapter.getInitialState(initialSteps),
  reducers: {
    // Do not merge the old todos state with the new todos coming in
    receiveSteps: (state, { payload }) => {
      stepsAdapter.setAll(state, payload);
    },
    receiveStep: (state, action) => {
      // upsertOne: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
      stepsAdapter.upsertOne(state, action);
    },
    removeStep: (state, action) => {
      stepsAdapter.removeOne(state, action);
    },
  },
});

// for selectors
// type RootState = ReturnType<typeof store.getState>
const stepsAdapterSelectors = stepsAdapter.getSelectors<RootState>(
  (state) => state.steps
);

const {
  selectAll: selectAllSteps,
  selectById: selectStepsById,
  selectIds: selectStepsIds,
} = stepsAdapterSelectors;
export const { receiveSteps, receiveStep, removeStep } = stepsSlice.actions;
export const stepsReducer = stepsSlice.reducer;

// reselect - memoize selector
// https://redux.js.org/tutorials/essentials/part-6-performance-normalization#memoizing-selector-functions
export const selectStepsByTodoId = createSelector(
  [selectAllSteps, (state: RootState, todoId: EntityId) => todoId],
  // jeśli tablica stepów i todoId się nie zmieni, nie będzie filtrował
  (steps, todoId) => steps.filter((step) => step.todo_id === todoId)
);
