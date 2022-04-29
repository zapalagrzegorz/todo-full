import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeStep, ToDoItemStep, updateStep } from "./stepsSlice";

interface StepListItemProps {
  step: ToDoItemStep;
}
export const StepListItem = ({ step }: StepListItemProps) => {
  const dispatch = useDispatch();

  const handleToggleDone = () => {
    dispatch(updateStep({ ...step, done: !step.done }));
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
          {step.done ? "Undone" : "Done"}
        </Button>
        <Button type="submit" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
