// TodoAPIUtil
import { client } from "../../api/client";
import { IToDoItem, IToDoItemContent } from "./todosSlice";
import { API_ORIGIN } from "../../api/environment";

export const fetchTodos = async () => {
  const response = await client.get("/api/todos");
  return response.data;
};

export const createTodo = async (body: IToDoItemContent) => {
  const config = { headers: {} };
  const csrfNode = document.querySelector<HTMLInputElement>(
    "[name='authenticity_token']"
  );
  if (csrfNode) {
    config.headers = { "X-CSRF-Token": csrfNode.value };
  } else {
    // throw new Error("No CSRF Token");
  }
  const response = await client.post(`/api/todos`, body, config);
  return response.data;
};

export const updateTodo = async (updateTodo: IToDoItem) => {
  const response = await client.patch(
    `/api/todos/${updateTodo.id}`,
    updateTodo
  );
  return response.data;
};
export const deleteTodo = async (body: number) => {
  const config = { headers: {} };
  const csrfNode = document.querySelector<HTMLInputElement>(
    "[name='authenticity_token']"
  );
  if (csrfNode) {
    config.headers = { "X-CSRF-Token": csrfNode.value };
  } else {
    // throw new Error("No CSRF Token");
  }
  const response = await client.delete(`/api/todos/${body}`, config);
  return response.data;
};
