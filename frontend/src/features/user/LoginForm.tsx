import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUser } from "./sessionApi";
import { loginUserThunk } from "./sessionSlice";
export interface IUserForm {
  user: {
    username: string;
    password: string;
  };
}

// import { createTodo } from "./todosSlice";
// import styles from "./Todo.module.scss";
// import { receiveStep, selectStepsByTodoId } from "./stepsSlice";

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Title is required");
      return;
    }
    if (!password) {
      setPasswordError("Body is required");
      return;
    }
    const userForm: IUserForm = { user: { username, password } };

    await dispatch(loginUserThunk(userForm));
    history.push("/");
  };
  return (
    <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h3" component="h2" gutterBottom>
        Login
      </Typography>
      <Typography paragraph={true} gutterBottom>
        Already seeded user:
        <br />
        Username: Guest
        <br />
        password: starwars
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="username"
          variant="outlined"
          margin="normal"
          value={username}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          error={usernameError ? true : false}
          helperText={usernameError}
        />
        <div className="">
          <TextField
            id="todoDescription"
            label="Password"
            variant="outlined"
            margin="normal"
            required={true}
            type={password}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            sx={{ mb: 3 }}
            error={passwordError ? true : false}
            helperText={passwordError}
          />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Paper>
  );
};
