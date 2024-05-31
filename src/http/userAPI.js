import { $authHost, $host } from "./index";

export const registration = async (
  name,
  email,
  password,
  password_confirmation
) => {
  const response = await $host.post("api/registration", {
    name,
    email,
    password,
    password_confirmation,
  });
  return response;
};

export const login = async (name, email, password) => {
  const response = await $host.post("api/login", { name, email, password });
  localStorage.setItem("tokenLARA", response.data.token);
  return response;
};
export const logOut = async () => {
  const response = await $host.post("api/logout");
  localStorage.clear();
  return response;
};

export const check = async (name, email, password) => {
  const response = await $host.post("api/registration", {
    name,
    email,
    password,
  });
  return response;
};

export const setUserData = async () => {
  const response = await $authHost.get("api/user");
  return response;
};

export const testInterceptor = async () => {
  const response = await $authHost.get("api/posts");
  return response;
};
