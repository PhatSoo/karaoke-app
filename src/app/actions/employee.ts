"use server";
import { fetchWithAuth } from "./config";

export const listEmployee = () => {
  return fetchWithAuth("api/employee")
    .then((r) => r.json())
    .then((res) => res);
};
