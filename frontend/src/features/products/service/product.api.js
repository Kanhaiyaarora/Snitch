import axios from "axios";

const api = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export const createProduct = async (formData) => {
  const response = await api.post("/", formData);
  return response.data;
};

export const getSellerProducts = async () => {
  const response = await api.get("/seller");
  return response.data;
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/detail/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}

export const addProductVariants = async (productId, newProductVariant) => {
  try {
const formData = new FormData();
newProductVariant.images.forEach((image) => {
  formData.append("images", image.file);
});
formData.append("stock", newProductVariant.stock);
formData.append("amount", newProductVariant.price.amount);
formData.append("attributes", JSON.stringify(newProductVariant.attributes));

    const response = await api.post(`/${productId}/variants`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding product variants:", error);
    throw error;
  }
}

export const updateVariantStock = async (productId, variantId, stock) => {
  try {
    const response = await api.patch(`/${productId}/variants/${variantId}/stock`, { stock });
    return response.data;
  } catch (error) {
    console.error("Error updating variant stock:", error);
    throw error;
  }
}