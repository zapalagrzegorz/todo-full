import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { receiveStep, removeStep, ToDoItemStep } from "./stepsSlice";

interface StepListItemProps {
  step: ToDoItemStep;
}
export const StepListItem = ({ step }: StepListItemProps) => {
  const dispatch = useDispatch();
  const [isDone, setDone] = useState(step.done);

  const handleToggleDone = () => {
    dispatch(receiveStep({ ...step, done: !isDone }));
    setDone(!isDone);
  };

  const handleDelete = () => {
    dispatch(removeStep(step.id));
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Typography variant="h6" component="h5">
        {step.title}
      </Typography>
      <Typography paragraph={true}>{step.body}</Typography>
      <div>
        <Button type="submit" onClick={handleToggleDone}>
          {isDone ? "Undone" : "Done"}
        </Button>
        <Button
          type="submit"
          // variant="outlined"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
