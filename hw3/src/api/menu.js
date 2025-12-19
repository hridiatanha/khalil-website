import { api } from "./client";

export function fetchMenu() {
  return api("/api/menu");
}
