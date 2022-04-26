import { Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { ToDoListItem } from "./ToDoListItem";
import { selectAllTodoIds } from "./todosSlice";

export const ToDoList = () => {
  const todosIds = useAppSelector((state) => selectAllTodoIds(state));

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h3" component="h2">
        Your todos list
      </Typography>
      <ul className="">
        {todosIds.map((todoId) => (
          <li key={todoId}>
            <ToDoListItem todoId={todoId} />
          </li>
        ))}
      </ul>
    </Paper>
  );
};
