"use server";
import { fetchWithAuth } from "./config";

export const payment = (id: number, total: number) => {
  return fetchWithAuth("api/payment", {
    method: "PUT",
    body: JSON.stringify({ order_id: id, total }),
  })
    .then((r) => r.json())
    .then((res) => res);
};
