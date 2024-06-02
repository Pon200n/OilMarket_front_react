import { $authHost, $host } from "./index";

export const getStatuses = async () => {
  const response = await $host.get("api/statusesPublic");
  return response;
};

export const addStatus = async (status_name) => {
  const response = await $authHost.post("api/statusesAdmin", { status_name });
  return response;
};
export const updateStatus = async (id, status_name) => {
  const response = await $authHost.patch("api/statusesAdmin/" + id, {
    status_name,
  });
  return response;
};

export const deleteStatus = async (id) => {
  const response = await $authHost.delete("api/statusesAdmin/" + id);
  return response;
};
