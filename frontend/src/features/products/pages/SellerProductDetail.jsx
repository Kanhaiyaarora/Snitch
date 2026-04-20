import React from 'react'
import { useParams } from 'react-router';

const SellerProductDetail = () => {
  const { productId } = useParams();
  console.log(productId);


  return (
    <div>
      SellerProductDetail
    </div>
  )
}

export default SellerProductDetail
