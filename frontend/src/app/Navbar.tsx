import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Alert,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { clearStatus, logoutUserThunk } from "../features/user/sessionSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const Navbar = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session);

  // const [isAlert, setIsAlert] = useState(true);

  const hideAlert = () => {
    dispatch(clearStatus());
  };
  const handleClick = async () => {
    await dispatch(logoutUserThunk());
    history.push("/login");
    // redirect
  };

  const signOutButton = session.currentUser && (
    <Typography align="right">
      Hello user, {session.currentUser.username}
      <Button
        type="button"
        onClick={handleClick}
        variant="contained"
        sx={{ ml: 2 }}
      >
        Sign out
      </Button>
    </Typography>
  );

  const alert = session.status && (
    <Collapse in={Boolean(session.status)}>
      <Alert onClose={hideAlert} severity="success">
        {session.status}
      </Alert>
    </Collapse>
  );

  return (
    <Container>
      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        {signOutButton}
        {alert}
        <Typography variant="h2" component="h1" align="center">
          Yet another To-do {process.env.REACT_APP_API_ORIGIN}
        </Typography>
      </Paper>
    </Container>
  );
};
