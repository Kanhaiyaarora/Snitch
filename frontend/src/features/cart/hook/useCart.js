import { useDispatch } from "react-redux";
import { addItemApi, getCart } from "../service/cart.api";
import { addItem, setItems } from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addItemApi({ productId, variantId });
    dispatch(addItem(data.cart.item));
    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    dispatch(setItems(data.cart.items));
  }

  return {
    handleAddItem,
    handleGetCart,
  };
};

export default useCart;
