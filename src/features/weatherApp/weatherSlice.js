import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = 'e701a532701479b60c02d39b4d58395c';

const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return data
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchWeather.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'succeded';
                    state.data = action.payload;
                } else {
                    state.status = "failed";
                }
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectAllDataWeather = (state) => state.weather.data;
export const getWeatherStatus = (state) => state.weather.status;
export const getWeatherError = (state) => state.weather.error;

fetchWeather('Cordoba')

export default weatherSlice.reducer;