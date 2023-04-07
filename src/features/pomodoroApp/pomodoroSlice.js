import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    running: false,
    pomodoroTime: 25,
    settings: {
        work: 25,
        break: 5,
        long: 15
    },
    mode: 'work',
    status: 'stopped', //stopped || running
    sessionsCount: 0,
    longBreakInterval: 4
}


const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        startPomodoroCounter(state) {
            state.status = 'running';
            state.running = true;
        },
        changePomodoroCounterExecution(state) {
            state.running = false;
            state.pomodoroTime=0;
            if (state.mode === 'work') {
                state.status = 'stopped';
                state.sessionsCount += 1;
                if (state.sessionsCount % state.longBreakInterval === 0) {
                    state.pomodoroTime = state.settings['long'];
                    state.mode = 'long'
                } else {
                    state.pomodoroTime = state.settings['break'];
                    state.mode = 'break';

                }
                return;
            }
            if (state.mode === 'break') {
                state.status = 'stopped';
                state.pomodoroTime = state.settings['work'];
                state.mode = 'work'
                return;
            }
            if (state.mode === 'long') {
                state.status = 'stopped';
                state.pomodoroTime = state.settings['work'];
                state.mode = 'work'
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
                case 'work':
                    state.pomodoroTime = state.settings['work'];
                    break;
                case 'break':
                    state.pomodoroTime = state.settings['break'];
                    break;
                case 'long':
                    state.pomodoroTime = state.settings['long'];
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
export const getPomodoroState = (state) => state.pomodoro;


export const {
    startPomodoroCounter,
    changePomodoroCounterExecution,
    startAnimation,
    stopAnimation,
    updatePomodoroTime
} = pomodoroSlice.actions;


export default pomodoroSlice.reducer;