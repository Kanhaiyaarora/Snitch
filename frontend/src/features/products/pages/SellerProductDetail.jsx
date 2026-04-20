import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useProduct } from '../hook/useProduct';


const SellerProductDetail = () => {
  const { handleGetProductById, handleAddProductVariants } = useProduct();
  const [product, setProduct] = useState(null);

  const { productId } = useParams();
  console.log(productId);
  console.log(product);



  useEffect(() => {
    async function fetchProduct() {
      const data = await handleGetProductById(productId);
      setProduct(data);
    }
    fetchProduct();
  }, [productId]);

  return (
    <div>
      SellerProductDetail
    </div>
  )
}

export default SellerProductDetail
