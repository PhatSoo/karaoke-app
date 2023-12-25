"use server";
import { fetchWithAuth } from "./config";

export const listProd = () => {
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
