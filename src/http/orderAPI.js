import { $authHost, $host } from "./index";
// *  статус
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

// *корзина
export const addProductToBasket = async (product_id) => {
  const response = await $authHost.post("api/basket", { product_id });
  return response;
};

export const getUserProductsFromBasket = async () => {
  const response = await $authHost.get("api/basket");
  return response;
};

export const deleteProductFromBasket = async (id) => {
  const response = await $authHost.delete("api/basket/" + id);
  return response;
};

export const updateProductBasket = async (product_id, product_count) => {
  const response = await $authHost.patch("api/basket/" + product_id, {
    product_count,
  });
  return response;
};
