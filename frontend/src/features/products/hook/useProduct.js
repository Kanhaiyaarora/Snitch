import { setProducts, setSellerProducts } from "../state/product.slice";
import {
  addProductVariants,
  createProduct,
  getAllProducts,
  getProductById,
  getSellerProducts,
} from "../service/product.api";
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
    try {
      const data = await getSellerProducts();
      dispatch(setSellerProducts(data.products));
      return data.products;
    } catch (error) {
      console.error("Error fetching seller products:", error);
      throw error;
    }
  }

  async function handleGetAllProducts() {
    const data = await getAllProducts();
    dispatch(setProducts(data.products));
    return data.products;
  }

  async function handleGetProductById(productId) {
    const data = await getProductById(productId);
    return data.product;
  }

  async function handleAddProductVariants(productId, newProductVariant) {
    try {
      const data = await addProductVariants(productId, newProductVariant);
      return data.product;
    } catch (error) {
      console.error("Error adding product variants:", error);
      throw error;
    }
  }


  return { handleCreateProduct, handleGetSellerProducts, handleGetAllProducts, handleGetProductById, handleAddProductVariants };
};
