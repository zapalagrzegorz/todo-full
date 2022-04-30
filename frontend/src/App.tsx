import { Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import { ToDoForm } from "./features/todo/ToDoForm";
import { ToDoList } from "./features/todo/ToDoList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";

function App() {
  // called twice when not in useEffect!
  useEffect(() => {
    // dispatch(receiveTodos(initialState));
  }, []);

  return (
    <Router>
      <div className="App">
        {/* nav */}
        <Container>
          <div>
            <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
              <Typography>Login/logout</Typography>
              <Typography variant="h2" component="h1" align="center">
                Yet another To-do
              </Typography>
            </Paper>
          </div>
        </Container>
        <Switch>
          <Route exact={true} path="/">
            <Container>
              <Stack spacing={2}>
                <ToDoForm />
                <ToDoList />
              </Stack>
            </Container>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
