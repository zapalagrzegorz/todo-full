import { Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { DefaultRootState, useSelector } from "react-redux";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { receiveStep, receiveSteps } from "./features/steps/stepsSlice";
import { ToDoForm } from "./features/todo/ToDoForm";
import { ToDoList } from "./features/todo/ToDoList";
import {
  receiveTodo,
  receiveTodos,
  removeTodo,
  selectAllTodos,
} from "./features/todo/todosSlice";

function App() {
  // called twice when not in useEffect!
  useEffect(() => {
    // dispatch(receiveTodos(initialState));
  }, []);

  return (
    <div className="App">
      <Container>
        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 3, mt: 1 }}>
            <Typography variant="h2" component="h1" align="center">
              Yet another To-do
            </Typography>
          </Paper>

          <ToDoForm />

          <ToDoList />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
