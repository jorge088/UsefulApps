import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    running: false,
    pomodoroTime: 25,
    sessionDuration: 1,
    settings: {
        work: 25,
        break: 5,
        long: 15
    },
    mode: 'work',
    status: 'stopped', //stopped || running
    sessionsCount: 0,
    longBreakInterval: 4,
    detail: {
        category: '-',
        description: "-"
    },
    history: []
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
            state.pomodoroTime = 0;
            updateSessionDuration({ time: 1 })
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
        },
        updateSessionDuration(state, action) {
            state.sessionDuration = action.payload.time;
        },
        updatePomodoroDetail(state, action) {
            const { category, description } = action.payload;
            state.detail = { category, description }
        },
        saveSession(state) {
            let date = new Date();
            let day = date.getDate().toString().padStart(2, '0');
            let month = date.getMonth().toString().padStart(2, '0');
            let year = date.getFullYear();
            let dateFormated = `${day}/${month}/${year}`;
            let hour = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            let id = state.history.length === 0 ?
                1 :
                state.history[state.history.length - 1].id + 1
            const sessionDetail = {
                id,
                date: dateFormated,
                time: `${hour}:${minutes}`,
                duration: state.sessionDuration === 0 ? 1 : state.sessionDuration,
                detail: state.detail
            }
            state.history.push(sessionDetail);
            localStorage.setItem('PomodoroHistory', JSON.stringify(state.history));
        },
        deleteHistoryItem(state, action) {
            const { id } = action.payload;
            state.history = state.history.filter(pom => pom.id !== id);
            localStorage.setItem('PomodoroHistory', JSON.stringify(state.history));

        },
        getHistoryFromStorage(state) {
            const historyStorage = JSON.parse(localStorage.getItem('PomodoroHistory'));
            state.history = historyStorage || [];
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
export const getHistory = (state) => state.pomodoro.history;


export const {
    startPomodoroCounter,
    changePomodoroCounterExecution,
    startAnimation,
    stopAnimation,
    updatePomodoroTime,
    updateSessionDuration,
    updatePomodoroDetail,
    saveSession,
    deleteHistoryItem,
    getHistoryFromStorage
} = pomodoroSlice.actions;


export default pomodoroSlice.reducer;