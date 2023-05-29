import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currencyData, currencyHistoricData, currencyWeeklyData } from './../../Consts/currenciesApisData.js'

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const fetchCurrencyQuotation = createAsyncThunk('exchange/fetchCurrencyQuotation', async () => {

    const informal_USD = await fetchData(currencyData.informalUSD.API_URL);
    const oficial_USD = await fetchData(currencyData.oficialUSD.API_URL);
    const mep_USD = await fetchData(currencyData.mepUSD.API_URL);
    const euro = await fetchData(currencyData.euro.API_URL)

    const currenciesData = [
        {
            name: 'DOLAR OFICIAL',
            values: oficial_USD,
        },
        {
            name: 'DOLAR INFORMAL',
            values: informal_USD,
        },
        {
            name: 'DOLAR MEP',
            values: mep_USD,
        },
        {
            name: 'EURO',
            values: euro,
        }]
    return currenciesData;
})

export const fetchCurrencyInformation = createAsyncThunk('exchange/fetchCurrencyInformation', async (currencyName) => {

    let historicData = '';
    if (currencyName !== 'euro') historicData = await fetchData(currencyHistoricData[currencyName].API_URL);
    const weeklyData = await fetchData(currencyWeeklyData[currencyName].API_URL);

    return { currencyName, weeklyData, historicData }
});

const initialState = {
    currenciesData: [],
    status: 'idle',
    currenciesInformation: {
        informalUSD: null,
        oficialUSD: null,
        mepUSD: null,
        euro: null
    },
    informationStatus: {
        informalUSD: 'idle',
        oficialUSD: 'idle',
        mepUSD: 'idle',
        euro: 'idle'
    },
    error: ""
}

const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCurrencyQuotation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCurrencyQuotation.fulfilled, (state, action) => {
                state.status = 'succeded';
                state.currenciesData = action.payload;
            })
            .addCase(fetchCurrencyQuotation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchCurrencyInformation.pending, (state) => {
                // state.informationStatus = 'loading'
            })
            .addCase(fetchCurrencyInformation.fulfilled, (state, action) => {
                const { currencyName, historicData, weeklyData } = action.payload;
                state.informationStatus[currencyName] = 'succeded';
                state.currenciesInformation[currencyName] = { historicData, weeklyData };
            })
            .addCase(fetchCurrencyInformation.rejected, (state, action) => {
                const { currencyName } = action.payload;

                state.informationStatus[currencyName] = 'failed';
                state.error = action.error.message;
            })
    }
})

export const getCurrenciesData = (state) => state.exchange.currenciesData;
export const getStatus = (state) => state.exchange.status;
export const getCurrenciesInformation = (state) => state.exchange.currenciesInformation;
export const getInformationStatus = (state) => state.exchange.informationStatus;
export const getError = (state) => state.exchange.error;
export const getState = state => state.exchange;


export default exchangeSlice.reducer;