import React, { useEffect } from 'react'
import { useProduct } from '../hook/useProduct'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  const sellerProducts = useSelector((state) => state.product.sellerProducts)

  const { handleGetSellerProducts } = useProduct()

  useEffect(() => {
    handleGetSellerProducts()
  }, [])

  return (
    <div>
      Dash..........
    </div>
  )
}

export default Dashboard
