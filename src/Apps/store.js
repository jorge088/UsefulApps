import { configureStore } from "@reduxjs/toolkit";

import weatherReducer from "../features/weatherApp/weatherSlice"

export const store = configureStore({
    reducer: {
        weather: weatherReducer
    }
});