import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveTodo } from "./todosSlice";
import styles from "./Todo.module.scss";
// import { receiveStep, selectStepsByTodoId } from "./stepsSlice";

export const ToDoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    const newTodo = { id: nanoid(), title, body, done: false };
    dispatch(receiveTodo(newTodo));
  };
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <div className={styles.todo__form}>
        <Typography variant="h3" component="h2" gutterBottom>
          Add todo
        </Typography>
        <form onSubmit={addTodo}>
          <TextField
            id="todoTitle"
            label="Todo title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <div className={styles.halfWidth}>
            <TextField
              id="todoDescription"
              label="Content of todo"
              variant="outlined"
              margin="normal"
              fullWidth
              value={body}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBody(e.target.value)
              }
              sx={{ mb: 3 }}
            />
          </div>
          <Button type="submit" variant="contained">
            Create Todo
          </Button>
        </form>
      </div>
    </Paper>
  );
};
