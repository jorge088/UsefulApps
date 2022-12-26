import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: JSON.parse(localStorage.getItem('styleMode')) || false 
}

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers:{
        toggleStyleMode(state){
            state.darkMode = !state.darkMode;
            localStorage.setItem('styleMode',JSON.stringify(state.darkMode))

        }
    }
})

export const getDarkMode = (state) => state.darkMode.darkMode;

export const {
    toggleStyleMode
} = darkModeSlice.actions;

export default darkModeSlice.reducer;