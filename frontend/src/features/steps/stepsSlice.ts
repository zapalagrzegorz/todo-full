import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  EntityState,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import * as stepAPI from "../steps/stepsApi";

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

const stepsAdapter = createEntityAdapter<ToDoItemStep>();

export const fetchSteps = createAsyncThunk(
  "steps/fetchAll",
  async (todoId: number) => {
    return await stepAPI.fetchSteps(todoId);
  }
);

export const createStep = createAsyncThunk(
  "steps/addStep",
  async (stepBody: IToDoItemStepContent) => {
    return await stepAPI.createStep(stepBody);
  }
);

export const updateStep = createAsyncThunk(
  "steps/updateStep",
  async (updatedStep: ToDoItemStep) => {
    return await stepAPI.updateStep(updatedStep);
  }
);

// export const fetchSteps = createAsyncThunk("steps/fetch", async () => {
//   return await stepAPI.fetchSteps();
// });

const stepsSlice = createSlice({
  name: "steps",
  initialState: stepsAdapter.getInitialState(),
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.fulfilled, (state, action) => {
        stepsAdapter.setAll(state, action);
      })
      .addCase(createStep.fulfilled, (state, action) => {
        stepsAdapter.addOne(state, action);
      })
      .addCase(updateStep.fulfilled, (state, action) => {
        stepsAdapter.upsertOne(state, action);
      });
    // .addCase(fetchSteps.fulfilled, (state, action) => {
    //   stepsAdapter.setAll(state, action);
    // });
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
