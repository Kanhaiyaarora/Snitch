import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useCart from '../hook/useCart';

const Cart = () => {

  const cart = useSelector(state => state.cart.items)

  const { handleGetCart } = useCart()

  useEffect(() => {
    handleGetCart()
  }, [])

  console.log(cart);
  return (
    <div>
      Cart
    </div>
  )
}

export default Cart
