import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = 'https://mercados.ambito.com/dolar/informal/variacion';

const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchQuotation = createAsyncThunk('exchange/fetchQuotation', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
})

const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchQuotation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchQuotation.fulfilled, (state, action) => {
                state.status = 'succeded';
                state.data = action.payload;
            })
            .addCase(fetchQuotation.rejected, (state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectAllDataQuotation = (state) => state.exchange.data;
export const getStatus = (state) => state.exchange.status;
export const getError = (state) => state.exchange.error;


export default exchangeSlice.reducer;