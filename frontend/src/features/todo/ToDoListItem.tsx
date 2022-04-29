import { EntityId } from "@reduxjs/toolkit";
import classNames from "classnames";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  // receiveTodo,
  removeTodo,
  selectTodoById,
  IToDoItem,
  deleteTodo,
  updateTodo,
} from "./todosSlice";
import styles from "./Todo.module.scss";
import { useDispatch } from "react-redux";
import { StepsList } from "../steps/StepsList";
import { Button, Collapse, IconButton, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ToDoDetails } from "./ToDoDetails";

interface ToDoListItemProps {
  todoId: EntityId;
}
export const ToDoListItem = ({ todoId }: ToDoListItemProps) => {
  const todo = useAppSelector((state) => selectTodoById(state, todoId));
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();

  if (!todo) {
    return null;
  }

  const handleToggleShow = () => {
    setOpen(!isOpen);
  };
  const handleToggleDone = async () => {
    const id: number = todo.id;
    dispatch(updateTodo({ ...todo, done: !todo.done, id }));
  };

  const todoClasses = classNames(styles.todo, {
    [styles.open]: isOpen,
  });

  let details;
  if (isOpen) {
    details = <ToDoDetails todo={todo} />;
  }
  return (
    <div className={todoClasses}>
      <Stack direction="row" spacing={5} alignItems="center">
        <Typography variant="h5" paragraph={true} sx={{ pt: 1 }}>
          {todo.title}
        </Typography>

        <Button size="small" onClick={handleToggleDone}>
          {todo.done ? "Undone" : "Done"}
        </Button>
      </Stack>
      <div>
        <Button size="small" onClick={handleToggleShow}>
          {isOpen ? "Show less" : "Show more"}
        </Button>
      </div>
      <Collapse in={isOpen}>{details}</Collapse>
    </div>
  );
};
