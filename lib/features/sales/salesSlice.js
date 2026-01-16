import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3004/sales"

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const response = await axios.get(API_URL)
    return response.data
})

const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSales.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchSales.fulfilled, (state, action) => {
            state.status =' succedded'
            state.items = action.payload
        })
        .addCase(fetchSales.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default salesSlice.reducer