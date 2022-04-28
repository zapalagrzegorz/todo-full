import { useEffect } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { Button, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { StepsList } from "../steps/StepsList";
import styles from "./Todo.module.scss";
import { deleteTodo, IToDoItem } from "./todosSlice";
import { fetchSteps, selectStepsByTodoId } from "../steps/stepsSlice";
import { useAppSelector } from "../../app/hooks";

export const ToDoDetails = (props: { todo: IToDoItem }) => {
  const dispatch = useDispatch();

  const { todo } = props;
  const todoId = todo.id;
  const todoClasses = classNames(styles.todo, {
    [styles.open]: true,
  });

  const handleDelete = () => {
    // dispatch(deleteTodo(todoId as number));
  };

  const todoSteps = useAppSelector((state) =>
    selectStepsByTodoId(state, todoId)
  );

  useEffect(() => {
    if (!todoSteps.length) {
      dispatch(fetchSteps(todoId));
    }
  }, [dispatch]);

  return (
    <div className={styles.todo__details}>
      <Typography variant="h6" paragraph={true} sx={{ pt: 1, mb: 0 }}>
        Details:
      </Typography>
      <Typography paragraph={true}>{todo.body}</Typography>
      <StepsList todoId={todoId} />
      <Button
        color="error"
        variant="outlined"
        onClick={handleDelete}
        sx={{ mt: 4 }}
      >
        Delete Todo
      </Button>
    </div>
  );
};
