"use server";
import { fetchWithAuth } from "./config";

export const listCate = () => {
  return fetchWithAuth("api/category")
    .then((r) => r.json())
    .then((res) => res);
};
