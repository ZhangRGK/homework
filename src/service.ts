import axios from "axios";
import { ICategory, IBill } from "./constants";

export const client = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 6000,
});

client.interceptors.response.use((response) => response.data);

// Bill services
export const getAllBills = async () =>
  (await client.get<IBill[], IBill[]>("/bills")).map((bill) => ({
    ...bill,
    time: Number.parseInt(bill.time.toString()),
  }));

export const addBill = (bill: IBill) => client.post("/bills", bill);

// Category services

export const getCategories = () =>
  client.get<ICategory[], ICategory[]>("/categories");
