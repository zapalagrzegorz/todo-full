import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchSteps } from "../steps/stepsSlice";
import { ToDoListItem } from "./ToDoListItem";
import { fetchTodos, selectAllTodoIds } from "./todosSlice";

export const ToDoList = () => {
  const dispatch = useAppDispatch();
  const todosIds = useAppSelector((state) => selectAllTodoIds(state));

  const todosStatus = useAppSelector((state) => state.todos.status);
  // useAppSelector(state => state.todos.status)
  useEffect(() => {
    if (todosStatus === "idle") {
      dispatch(fetchTodos());
      // dispatch(fetchSteps());
    }
  }, [dispatch]);

  let content;

  if (todosStatus === "succeeded") {
    content = (
      <ul className="">
        {todosIds.map((todoId) => (
          <li key={todoId}>
            <ToDoListItem todoId={todoId} />
          </li>
        ))}
      </ul>
    );
  } else if (todosStatus === "loading") {
    content = (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h3" component="h2">
        Your todos list
      </Typography>

      {content}
    </Paper>
  );
};
