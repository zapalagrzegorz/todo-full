import { client } from "../../api/client";
import { IUserForm } from "./LoginForm";

export const createUser = async (userForm: IUserForm) => {
  const config = { headers: {} };
  const csrfNode = document.querySelector<HTMLInputElement>(
    "[name='authenticity_token']"
  );
  if (csrfNode) {
    config.headers = { "X-CSRF-Token": csrfNode.value };
  } else {
    // throw new Error("No CSRF Token");
  }
  try {
    const response = await client.post(
      "http://localhost:3000/api/users",
      userForm,
      config
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (userForm: IUserForm) => {
  const config = { headers: {} };
  const csrfNode = document.querySelector<HTMLInputElement>(
    "[name='authenticity_token']"
  );
  if (csrfNode) {
    config.headers = { "X-CSRF-Token": csrfNode.value };
  } else {
    // throw new Error("No CSRF Token");
  }
  try {
    const response = await client.post(
      "http://localhost:3000/api/session",
      userForm,
      config
    );
    return response.data;
    // dispatch(receiveCurrentUser(response.data));s
  } catch (err) {
    console.log(err);
  }
};
