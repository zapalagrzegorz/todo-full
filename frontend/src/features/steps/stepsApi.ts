// TodoAPIUtil
import { client } from "../../api/client";
import { IToDoItemStepContent, ToDoItemStep } from "./stepsSlice";
// import { IToDoItem, IToDoItemContent } from "./todosSlice";

export const fetchSteps = async (todoId: number) => {
  // const
  const response = await client.get(`/api/todos/${todoId}/steps`);
  return response.data;
};

export const createStep = async (body: IToDoItemStepContent) => {
  const config = { headers: {} };
  const csrfNode = document.querySelector<HTMLInputElement>(
    "[name='authenticity_token']"
  );
  if (csrfNode) {
    config.headers = { "X-CSRF-Token": csrfNode.value };
  } else {
    // throw new Error("No CSRF Token");
  }
  const response = await client.post(
    `/api/todos/${body.todo_id}/steps`,
    body,
    config
  );
  return response.data;
};

export const updateStep = async (updatedStep: ToDoItemStep) => {
  const response = await client.patch(
    `/api/steps/${updatedStep.id}`,
    updatedStep
  );
  return response.data;
};

export const deleteStep = async (body: number) => {
  const config = { headers: {} };
  const csrfNode = document.querySelector<HTMLInputElement>(
    "[name='authenticity_token']"
  );
  if (csrfNode) {
    config.headers = { "X-CSRF-Token": csrfNode.value };
  } else {
    // throw new Error("No CSRF Token");
  }
  const response = await client.delete(`/api/steps/${body}`, config);
  return response.data;
};
