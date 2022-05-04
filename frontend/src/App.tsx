import { Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import { ToDoForm } from "./features/todo/ToDoForm";
import { ToDoList } from "./features/todo/ToDoList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { Navbar } from "./app/Navbar";
import { useAppSelector } from "./app/hooks";

function App() {
  const { currentUser } = useAppSelector((state) => state.session);
  // called twice when not in useEffect!
  useEffect(() => {
    // dispatch(receiveTodos(initialState));
  }, []);

  let renderedRedirect = null;
  if (!currentUser) {
    renderedRedirect = <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact={true} path="/">
            {renderedRedirect ? (
              renderedRedirect
            ) : (
              <Container>
                <Stack spacing={2}>
                  <ToDoForm />
                  <ToDoList />
                </Stack>
              </Container>
            )}
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
