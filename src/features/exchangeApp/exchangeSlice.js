import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL_DOLAR_INFORMAL = 'https://mercados.ambito.com/dolar/informal/variacion';
const URL_DOLAR_INFORMAL_SEMANAL = 'https://mercados.ambito.com//dolar/informal/grafico/semanal';
const URL_DOLAR_INFORMAL_HISTORICO = 'https://mercados.ambito.com//dolar/informal/historico-cierre'
const URL_DOLAR_OFICIAL = 'https://mercados.ambito.com//dolar/oficial/variacion';
const URL_DOLAR_OFICIAL_SEMANAL = 'https://mercados.ambito.com//dolar/oficial/grafico/semanal';
const URL_DOLAR_OFICIAL_HISTORICO = 'https://mercados.ambito.com//dolar/oficial/historico-cierre';
const URL_DOLAR_MEP = 'https://mercados.ambito.com///dolarrava/mep/variacion';
const URL_DOLAR_MEP_SEMANAL = 'https://mercados.ambito.com///dolarrava/mep/grafico/semanal';
const URL_DOLAR_MEP_HISTORICO = 'https://mercados.ambito.com//dolarrava/mep/historico-cierre';
const URL_EURO = 'https://mercados.ambito.com//euro/variacion';
const URL_EURO_SEMANAL = 'https://mercados.ambito.com//euro/grafico/semanal';

const initialState = {
    data: [],
    status: 'idle',
    error: ""
}

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const fetchQuotation = createAsyncThunk('exchange/fetchQuotation', async () => {

    const informal_USD = await fetchData(URL_DOLAR_INFORMAL);
    const informal_USD_weekly = await fetchData(URL_DOLAR_INFORMAL_SEMANAL);
    const informal_USD_historic = await fetchData(URL_DOLAR_INFORMAL_HISTORICO);
    const oficial_USD = await fetchData(URL_DOLAR_OFICIAL);
    const oficial_USD_weekly = await fetchData(URL_DOLAR_OFICIAL_SEMANAL);
    const oficial_USD_historic = await fetchData(URL_DOLAR_OFICIAL_HISTORICO);
    const mep_USD = await fetchData(URL_DOLAR_MEP);
    const mep_USD_weekly = await fetchData(URL_DOLAR_MEP_SEMANAL);
    const mep_USD_historic = await fetchData(URL_DOLAR_MEP_HISTORICO);
    const euro = await fetchData(URL_EURO)
    const euro_weekly = await fetchData(URL_EURO_SEMANAL)

    const data = {
        oficial_USD: {
            name: 'DOLAR OFICIAL',
            values: oficial_USD,
            weekly: oficial_USD_weekly,
            historic: oficial_USD_historic
        },
        informal_USD: {
            name: 'DOLAR INFORMAL',
            values: informal_USD,
            weekly: informal_USD_weekly,
            historic: informal_USD_historic
        },
        mep_USD: {
            name: 'DOLAR MEP',
            values: mep_USD,
            weekly: mep_USD_weekly,
            historic: mep_USD_historic
        },
        euro: {
            name: 'EURO',
            values: euro,
            weekly: euro_weekly
        }
    }

    // console.log(data);
    return data;
})

const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchQuotation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchQuotation.fulfilled, (state, action) => {
                state.status = 'succeded';
                state.data = action.payload;
            })
            .addCase(fetchQuotation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectAllDataQuotation = (state) => state.exchange.data;
export const getStatus = (state) => state.exchange.status;
export const getError = (state) => state.exchange.error;


export default exchangeSlice.reducer;