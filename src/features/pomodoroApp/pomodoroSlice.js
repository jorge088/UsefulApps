import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    running: false,
    pomodoroTime: 25,
    settings: {
        work: 25,
        break: 5,
        long: 15,
        mode: null
    },
    sessionsCount: 0,
    status: 'idle',
    error: null
}


const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        startPomodoroCounter(state, action) {
            switch (state.pomodoroTime) {
                case 25:
                    state.pomodoroTime = state.settings['work'];
                    state.settings = {
                        ...state.settings,
                        mode: 'work'
                    };
                    break;
                case 5:
                    state.pomodoroTime = state.settings['break'];
                    state.settings = {
                        ...state.settings,
                        mode: 'break'
                    };
                    break;
                default:
                    state.settings = null;
                    state.running = false;
                    break;

            }
            state.running = true;
        },
        changePomodoroCounterExecution(state, action) {
            state.running = false;
            if (state.settings.mode === 'work') {
                state.settings = {
                    ...state.settings,
                    mode: null
                }
                state.sessionsCount += 1;
                state.pomodoroTime = 5;
                return;
            }
            if (state.settings.mode === 'break') {
                state.settings = {
                    ...state.settings,
                    mode: null
                }
                state.pomodoroTime = 25;
                return;
            }

        }
    }
})

export const getRunning = (state) => state.pomodoro.running;
export const getPomodoroTime = (state) => state.pomodoro.pomodoroTime;
export const getAllSettings = (state) => state.pomodoro.settings;
export const getSessionsCount = (state) => state.pomodoro.sessionsCount;
export const getStatus = (state) => state.pomodoro.status;


export const { startPomodoroCounter, changePomodoroCounterExecution } = pomodoroSlice.actions;


export default pomodoroSlice.reducer;