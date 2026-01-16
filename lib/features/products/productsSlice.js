import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3004/products"

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(API_URL)
    return response.data
})

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
    const response = await axios.post(API_URL, product)
    return response.data
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    const {id, ...data} = product
    const response = await axios.put(`${API_URL}/${id}`, data)
    return response.data
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id)
                if(index !== -1) {
                    state.items[index] = action.payload
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items;Filter(p => p.id !== action.payload)
            })
    }
})

export default productSlice.reducer;