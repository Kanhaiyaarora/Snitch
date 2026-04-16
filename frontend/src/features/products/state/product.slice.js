import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts : []
  },
  reducers: {
    setSellerProducts: (state,action)=>{
      state.sellerProducts = action.payload
    }
  }
})


export const {setSellerProducts} = productSlice.action

export default productSlice.reducer
