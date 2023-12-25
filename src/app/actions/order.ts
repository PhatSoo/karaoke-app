"use server";
import { fetchWithAuth } from "./config";

export const orderRoom = (
  room_id: number,
  user_id: number,
  list_order: any,
) => {
  return fetchWithAuth("api/order", {
    method: "POST",
    body: JSON.stringify({ room_id, user_id, list_order }),
  })
    .then((r) => r.json())
    .then((res) => res);
};

export const orderProduct = (order_id: number, list_order: any) => {
  return fetchWithAuth("api/order-product", {
    method: "POST",
    body: JSON.stringify({ order_id, list_order }),
  })
    .then((r) => r.json())
    .then((res) => res);
};

export const getOrderDetails = (room_id: number) => {
  return fetchWithAuth(`api/get-order-details/${room_id}`)
    .then((r) => r.json())
    .then((res) => res);
};
