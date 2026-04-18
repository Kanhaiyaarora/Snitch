import React from 'react'
import { useProduct } from '../hook/useProduct'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const products = useSelector((state) => state.product.products)
  const { handleGetAllProducts } = useProduct()

  useEffect(() => {
    handleGetAllProducts()
  }, []);

  return (
    <div>

    </div>
  )
}

export default Home
