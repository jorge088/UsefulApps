import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    running: false,
    pomodoroTime: 25,
    settings: {
        work: 25,
        break: 5,
        long: 15
    },
    mode: 'start',
    sessionsCount: 0,
    status: 'idle',
    error: null
}


const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        startPomodoroCounter(state) {
            switch (state.pomodoroTime) {
                case 0:
                    state.pomodoroTime = state.settings['work'];
                    state.mode = 'work';
                    break;
                case state.settings['work']:
                    state.mode = 'work';
                    break;
                case state.settings['break']:
                    state.mode = 'break';
                    break;
                default:
                    state.settings = null;
                    state.running = false;
                    break;
            }
            state.running = true;
        },
        changePomodoroCounterExecution(state) {
            state.running = false;
            if (state.mode === 'work') {
                state.mode = 'start'
                state.sessionsCount += 1;
                state.pomodoroTime = state.settings['break'];
                return;
            }
            if (state.mode === 'break') {
                state.mode = 'start';
                state.pomodoroTime = state.settings['work'];
                return;
            }

        },
        updatePomodoroTime(state, action) {
            state.settings = {
                work: action.payload.workTime,
                break: action.payload.breakTime,
                long: action.payload.longBreakTime
            }
            switch (state.mode) {
                case 'start':
                    state.pomodoroTime = state.settings['work'];
                    break;
                case 'work':
                    state.pomodoroTime = state.settings['work'];
                    break;
                case 'break':
                    state.pomodoroTime = state.settings['break'];
                    break;
                default:
                    break;
            }
        },
        startAnimation(state) {
            state.running = true;
        },
        stopAnimation(state) {
            state.running = false;
        }
    }
})

export const getRunning = (state) => state.pomodoro.running;
export const getPomodoroTime = (state) => state.pomodoro.pomodoroTime;
export const getAllSettings = (state) => state.pomodoro.settings;
export const getMode = (state) => state.pomodoro.mode;
export const getSessionsCount = (state) => state.pomodoro.sessionsCount;
export const getStatus = (state) => state.pomodoro.status;


export const {
    startPomodoroCounter,
    changePomodoroCounterExecution,
    startAnimation,
    stopAnimation,
    updatePomodoroTime
} = pomodoroSlice.actions;


export default pomodoroSlice.reducer;