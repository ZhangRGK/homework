import axios from "axios";
import { ICategory, IBill } from "./constants";

export const client = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 6000,
});

client.interceptors.response.use((response) => response.data);

// Bill services
export const getAllBills = () => client.get<IBill[], IBill[]>("/bills");

export const addBill = (bill: IBill) =>
  client.post("/bills", {
    data: bill,
  });

// Category services

export const getCategories = () =>
  client.get<ICategory[], ICategory[]>("/categories");
