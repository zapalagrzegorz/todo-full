import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent, useState } from "react";
import { createTodo } from "./todosSlice";
import styles from "./Todo.module.scss";
import { useAppDispatch } from "../../app/hooks";

export const ToDoForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [helperTextTitle, setHelperTextTitle] = useState("");
  const [helperBodyTitle, setHelperBodyTitle] = useState("");

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    const newTodo = { title, body, done: false };
    if (!title) {
      setHelperTextTitle("Title is required");
      return;
    }
    if (!body) {
      setHelperBodyTitle("Body is required");
      return;
    }
    dispatch(createTodo(newTodo));
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
            error={helperTextTitle ? true : false}
            helperText={helperTextTitle}
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
              error={helperBodyTitle ? true : false}
              helperText={helperBodyTitle}
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
