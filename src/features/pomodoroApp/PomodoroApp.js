import { useSelector, useDispatch } from 'react-redux';

import {
    startPomodoroCounter,
    startAnimation,
    stopAnimation,
    changePomodoroCounterExecution,
    getPomodoroState
} from "./pomodoroSlice"

import styles from './PomodoroApp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import PomodoroCounter from './PomodoroCounter';
import Button from "./../../Components/Shared/Button";
import { useEffect, useState } from 'react';
import PomodoroSettings from './PomodoroSettings';

const PomodoroApp = () => {

    const dispatch = useDispatch();
    const { pomodoroTime, running, status, sessionsCount, mode } = useSelector(getPomodoroState);

    const [showSettings, setShowSettings] = useState(false);

    const getExecutionStatus = () => {
        if (status === 'stopped') return 'Inicia tu reloj'
        if (mode === 'work') return 'A concentrarse!'
        if (mode === 'break') return 'Tomá un descanso corto!'
        if (mode === 'long') return 'Tomá un descanso largo!'
    }

    const handlerPomodoroStart = () => {
        dispatch(startPomodoroCounter());
    }

    const handlerChangePomodoroExecution = () => {
        dispatch(changePomodoroCounterExecution())
    }

    const handlerStartAnimation = () => {
        dispatch(startAnimation())
    }

    const handlerStopAnimation = () => {
        dispatch(stopAnimation())
    }

    const handleShowSettings = () => {
        setShowSettings(!showSettings);

    }

    useEffect(() => {
        dispatch(stopAnimation())
    }, [dispatch])

    const handleEsc = (e) => {
        if (e.key === 'Escape' && showSettings) handleShowSettings();
    }
    window.addEventListener('keydown', handleEsc)



    return (
        <>
            <div className={styles.container}>
                <div className={styles.appContainer}>
                    <button
                        className={styles.settingsBtn}
                        onClick={handleShowSettings}>
                        <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    </button>
                    <p className={styles.status}>{getExecutionStatus()}</p>

                    {mode === 'work' ?
                        <p className={styles.sessions}>Pomodoro ({sessionsCount})</p>
                        : ''
                    }
                    <PomodoroCounter
                        time={pomodoroTime}
                        animation={running}
                    />

                    <div className={styles.btnControl}>
                        {status === 'stopped' ?
                            <Button
                                type={'classic'}
                                content={'Iniciar'}
                                _callback={handlerPomodoroStart}
                            />
                            :
                            <Button
                                type={'classic'}
                                content={`${running ? 'Pausar' : 'Continuar'}`}
                                _callback={running ? handlerStopAnimation : handlerStartAnimation}
                            />
                        }
                        <Button
                            type={'close'}
                            content={'Omitir'}
                            _callback={status === 'stopped' ? handlerPomodoroStart : handlerChangePomodoroExecution}
                            disabled={!running}
                        />
                    </div>

                </div>
                {showSettings ?
                    <PomodoroSettings _callbackCloseSettings={handleShowSettings} />
                    : <></>
                }
            </div>
        </>
    )
}
export default PomodoroApp 