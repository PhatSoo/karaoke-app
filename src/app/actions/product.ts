"use server";
import { fetchWithAuth } from "./config";

export const listProd = () => {
  return fetchWithAuth("product-list")
    .then((r) => r.json())
    .then((res) => res);
};

export const listProdByAdmin = () => {
  return fetchWithAuth("api/product")
    .then((r) => r.json())
    .then((res) => res);
};

export const create = (data: any) => {
  return fetchWithAuth("api/product", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((res) => res);
};

export const update = (data: any) => {
  return fetchWithAuth("api/product", {
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((res) => res);
};

export const remove = (product_id: number) => {
  return fetchWithAuth(`api/product/${product_id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((res) => res);
};

export const deleteMultiple = (ids: number[]) => {
  return fetchWithAuth(`api/product-multiple/${ids.toString()}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((res) => res);
};
