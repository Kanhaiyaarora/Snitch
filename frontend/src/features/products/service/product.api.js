import axios from "axios";

const api = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export const createProduct = async (formData) => {
  const response = api.post("/", { formData });
  return response.data;
};

export const getSellerProducts = async () => {
  const response = api.get("/seller");
  return response.data;
};
