import { Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import { ToDoForm } from "./features/todo/ToDoForm";
import { ToDoList } from "./features/todo/ToDoList";

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
