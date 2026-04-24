import { useDispatch } from "react-redux";
import { addItemApi } from "../service/cart.api";
import { addItem, setItems } from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addItemApi({ productId, variantId });
    dispatch(addItem(data.cart.item));
    return data;
  }

  return {
    handleAddItem,
  };
};

export default useCart;
