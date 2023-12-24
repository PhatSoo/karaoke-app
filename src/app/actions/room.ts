"use server";

import { fetchWithAuth } from "./config";

export const list = () => {
  return fetchWithAuth("api/room")
    .then((r) => r.json())
    .then((res) => res);
};
