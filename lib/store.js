import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productsSlice"
import salesReducer from "./features/sales/salesSlice"

export const makeStore = configureStore({
    reducer: {
        products: productReducer,
        sales: productReducer
    }
})