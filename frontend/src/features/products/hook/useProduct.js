import { setSellerProducts } from "../state/product.slice";
import { createProduct, getSellerProducts } from "../service/product.api";
import { useDispatch } from "react-redux";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      const data = await createProduct(formData);
      return data.product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async function handleGetSellerProducts() {
    const data = await getSellerProducts();
    dispatch(setSellerProducts(data.products));
    return data.products
  }

  return { handleCreateProduct, handleGetSellerProducts };
};
