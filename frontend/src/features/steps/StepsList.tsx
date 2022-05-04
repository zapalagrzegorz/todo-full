import { Button, Stack, TextField, Typography } from "@mui/material";
import { EntityId, nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { StepListItem } from "./StepListItem";
import { createStep, receiveStep, selectStepsByTodoId } from "./stepsSlice";
interface StepListProps {
  todoId: EntityId;
}
export const StepsList = ({ todoId }: StepListProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const todoSteps = useAppSelector((state) =>
    selectStepsByTodoId(state, todoId)
  );
  // const steps = useAppSelector((state) => {
  //   return Object.values(state.steps.entities).filter(
  //     (step) => step?.todo_id === todoId
  //   );
  // });
  const addStep = (e: FormEvent) => {
    e.preventDefault();

    const newStep = { title, body, done: false, todo_id: todoId as number };
    dispatch(createStep(newStep));

    setTitle("");
    setBody("");
  };
  let stepsList;
  let stepHeader;
  if (todoSteps.length) {
    stepHeader = (
      <Typography variant="h5" component="h4" gutterBottom>
        Steps
      </Typography>
    );
    stepsList = todoSteps.map((step) => (
      <StepListItem key={step.id} step={step} />
    ));
  }
  return (
    <div>
      {stepHeader}
      {stepsList}
      <p>Add step:</p>
      <Stack spacing={2} sx={{ width: "25ch" }}>
        <form onSubmit={addStep}>
          <TextField
            id="stepTitle"
            label="Step title"
            variant="outlined"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <TextField
            id="stepTitle"
            label="Step description"
            variant="outlined"
            margin="normal"
            value={body}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBody(e.target.value)
            }
          />
          <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
            Create Step
          </Button>
        </form>
      </Stack>
    </div>
  );
};
