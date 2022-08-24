import { createContext, useContext, useState } from 'react';

const PomodoroContext = createContext();

export const usePomodoroContext = () => useContext(PomodoroContext);

const PomodoroContextProvider = ({ children }) => {
    const [running, setRunning] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [settings, setSettings] = useState({
        work: 25,
        break: 5,
        long: 15,
        mode: null
    });

    const startPomodoro = () => {
        switch (pomodoroTime) {
            case 25:
                setPomodoroTime(settings['work']);
                setSettings({
                    ...settings,
                    mode: 'work'
                });
                break;
            case 5:
                setPomodoroTime(settings['break'])
                setSettings({
                    ...settings,
                    mode: 'break'
                });
                break;
            default:
                setSettings(null);
                stopAnimation();
                break;
        }
        startAnimation();
    }

    const startAnimation = () => {
        setRunning(true);
    }

    const stopAnimation = () => {
        setRunning(false);
    }

    const changeExecution = () => {
        stopAnimation();
        if (settings.mode === 'work') {
            setSettings({
                ...settings,
                mode: null
            });
            setPomodoroTime(5);
            return;
        }
        if (settings.mode === 'break') {
            setSettings({
                ...settings,
                mode: null
            });
            setPomodoroTime(25);
            return;
        }
    }



    return <PomodoroContext.Provider
        value={{
            running,
            pomodoroTime,
            settings,
            setSettings,
            startAnimation,
            stopAnimation,
            changeExecution,
            startPomodoro
        }}>
        {children}
    </PomodoroContext.Provider>
}
export default PomodoroContextProvider;