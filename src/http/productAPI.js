import { values } from "mobx";

import { $authHost, $host } from "./index";
// * Categories
export const getCategoriesLara = async () => {
  const response = await $host.get("api/categoriesPublic");
  return response;
};

export const addCategoryLara = async (category_name) => {
  const response = await $authHost.post("api/categoriesAdmin", {
    category_name: category_name,
  });
  return response;
};

export const deleteCategoryLara = async (id) => {
  const response = await $authHost.delete("api/categoriesAdmin/" + id);
  return response;
};

export const updateCategoryLara = async (id, category_name) => {
  const response = await $authHost.patch("api/categoriesAdmin/" + id, {
    category_name: category_name,
  });
  return response;
};

// * Chars

export const getCharsLara = async () => {
  const response = await $host.get("api/categoryCharPublic");
  return response;
};

export const addCharLara = async (char_name, category_id) => {
  const response = await $authHost.post("api/categoryCharAdmin", {
    char_name,
    category_id,
  });
  return response;
};

export const updateCharLara = async (id, char_name) => {
  const response = await $authHost.patch("api/categoryCharAdmin/" + id, {
    char_name,
  });
  return response;
};

export const deleteCharLara = async (id) => {
  const response = await $authHost.delete("api/categoryCharAdmin/" + id);
  return response;
};

// * Values

export const getValuesLara = async () => {
  const response = await $host.get("api/categoryCharValuePublic");
  return response;
};

export const addValueLara = async (value_name, char_id) => {
  const response = await $authHost.post("api/categoryCharValueAdmin", {
    value_name,
    char_id,
  });
  return response;
};

export const updateValueLara = async (id, value_name, char_id) => {
  const response = await $authHost.patch("api/categoryCharValueAdmin/" + id, {
    value_name,
    char_id,
  });
  return response;
};

export const deleteValueLara = async (id) => {
  const response = await $authHost.delete("api/categoryCharValueAdmin/" + id);
  return response;
};
// * Brands

export const getBrandsLara = async () => {
  const response = await $host.get("api/brandsPublic");
  return response;
};

export const addBrandLara = async (brand_name, brand_country) => {
  const response = await $authHost.post("api/brandsAdmin", {
    brand_name,
    brand_country,
  });
  return response;
};

export const deleteBrandLara = async (id) => {
  const response = await $authHost.delete("api/brandsAdmin/" + id);
  return response;
};

export const updateBrandLara = async (id, brand_name, brand_country) => {
  const response = await $authHost.patch("api/brandsAdmin/" + id, {
    brand_name,
    brand_country,
  });
  return response;
};

// * Product
export const getProducts = async (
  page,
  perPage,
  category_id,
  brand_id,
  values,
  sortByPrice
) => {
  const response = await $host.get(
    "api/productPublic?page=" +
      page +
      "&perPage=" +
      perPage +
      "&category_id=" +
      category_id +
      "&brand_id=" +
      brand_id +
      "&values=" +
      values +
      "&sortByPrice=" +
      sortByPrice
  );
  return response;
};

export const getProduct = async (id) => {
  const response = await $host.get("api/productPublic/" + id);
  return response;
};

export const deleteProduct = async (id) => {
  const response = await $authHost.delete("api/productAdmin/" + id);
  return response;
};

// export const updateProduct = async (
//   id,
//   name,
//   price,
//   category_id,
//   brand_id,
//   description,
//   values
// ) => {
//   const response = await $authHost.patch(
//     "api/productAdmin/" +
//       id +
//       "?name=" +
//       name +
//       "&price=" +
//       price +
//       "&category_id=" +
//       category_id +
//       "&brand_id=" +
//       brand_id +
//       "&description=" +
//       description +
//       "&values=" +
//       values
//   );
//   return response;
// };

export const updateProduct = async (id, formData) => {
  const response = await $authHost.patch(
    "api/productAdmin/" + id,
    formData
    // , {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );
  return response;
};

export const addProduct = async (data) => {
  const response = await $authHost.post("api/productAdmin", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// !
export const update = async (formData) => {
  const response = await $authHost.post("api/updateProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
