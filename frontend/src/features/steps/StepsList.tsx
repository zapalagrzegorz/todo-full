import { Button, Stack, TextField, Typography } from "@mui/material";
import { EntityId, nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { StepListItem } from "./StepListItem";
import { receiveStep, selectStepsByTodoId } from "./stepsSlice";
interface StepListProps {
  todoId: EntityId;
}
export const StepsList = ({ todoId }: StepListProps) => {
  const dispatch = useDispatch();
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

    const newStep = { id: nanoid(), title, body, done: false, todo_id: todoId };
    dispatch(receiveStep(newStep));
    setTitle("");
    setBody("");
  };
  if (!todoSteps.length) {
    return null;
  }
  return (
    <div>
      <Typography variant="h5" component="h4" gutterBottom>
        Steps
      </Typography>
      {todoSteps.map((step) => (
        <StepListItem key={step.id} step={step} />
      ))}
      <p>Add step:</p>
      <Stack
        onSubmit={addStep}
        spacing={2}
        component="form"
        sx={{ width: "25ch" }}
      >
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
      </Stack>
      <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
        Create Step
      </Button>
    </div>
  );
};
