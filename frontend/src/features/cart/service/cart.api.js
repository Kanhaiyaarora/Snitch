import axios from "axios";

const api = axios.create({
  baseURL: "/api/cart",
  withCredentials: true,
});

export const addItemApi = async ({ productId, variantId }) => {
  try {
    const response = await api.post(`/add/${productId}/${variantId}`, {
      quantity: 1,
    });
    return response.data;
  } catch (error) {
    console.log("Error in add to cart :", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.log("Error in fetching user cart :", error);
    throw error;
  }
};
