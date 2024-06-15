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
export const addProductToBasket = async (product_id, fixed_price) => {
  const response = await $authHost.post("api/basket", {
    product_id,
    fixed_price,
  });
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
// * заказ

export const getOrders = async () => {
  const response = await $authHost.get("api/order");
  return response;
};

export const getAllOrders = async () => {
  const response = await $authHost.get("api/orderAdmin");
  return response;
};
export const getOrder = async (id) => {
  const response = await $authHost.get("api/orderAdmin/" + id);
  return response;
};

export const addOrder = async (delivery_place) => {
  const response = await $authHost.post("api/order", { delivery_place });
  return response;
};
export const updateOrderStatus = async (id, status_id) => {
  const response = await $authHost.patch("api/orderAdmin/" + id, { status_id });
  return response;
};