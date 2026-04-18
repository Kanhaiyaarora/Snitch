import React from 'react'
import { useParams } from 'react-router'
import { useProduct } from '../hook/useProduct';
import { useEffect } from 'react';
import { useState } from 'react';

const ProductDetail = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const { handleGetProductById } = useProduct()

  async function fetchProductDetails() {
    const data = await handleGetProductById(productId)
    setProduct(data)
  }


  useEffect(() => {
    fetchProductDetails()
  }, [productId])


  return (
    <div>

    </div>
  )
}

export default ProductDetail
