import { configureStore } from "@reduxjs/toolkit";

import weatherReducer from "../features/weatherApp/weatherSlice";
import exchangeReducer from "../features/exchangeApp/exchangeSlice";
import pomodoroReducer from "../features/pomodoroApp/pomodoroSlice";
import darkModeReducer from "../features/darkMode/darkModeSlice"


export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        exchange: exchangeReducer,
        pomodoro: pomodoroReducer,
        darkMode: darkModeReducer
    }
});