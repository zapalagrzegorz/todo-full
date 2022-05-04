import { client } from "../../api/client";
import { API_ORIGIN } from "../../api/environment";
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
      `${API_ORIGIN}/api/users`,
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
      `${API_ORIGIN}/api/session`,
      userForm,
      config
    );
    return response.data;
    // dispatch(receiveCurrentUser(response.data));s
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async () => {
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
    const response = await client.delete(`${API_ORIGIN}/api/session`, config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
