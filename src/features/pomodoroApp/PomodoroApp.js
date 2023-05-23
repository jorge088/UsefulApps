import { useSelector, useDispatch } from 'react-redux';

import {
    startPomodoroCounter,
    startAnimation,
    stopAnimation,
    changePomodoroCounterExecution,
    updateSessionDuration,
    getPomodoroState,
    saveSession
} from "./pomodoroSlice"

import styles from './PomodoroApp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import PomodoroCounter from './PomodoroCounter';
import Button from "./../../Components/Shared/Button";
import { useEffect, useState } from 'react';
import PomodoroSettings from './PomodoroSettings';
import PomodoroHistory from './PomodoroHistory';
import PomodoroDetailForm from './PomodoroDetailForm';
import SideAlert from '../../Components/Shared/SideAlert';

const PomodoroApp = () => {

    const dispatch = useDispatch();
    const { pomodoroTime, running, status, sessionsCount, mode } = useSelector(getPomodoroState);
    const [showSettings, setShowSettings] = useState(false);
    const [sideAlert, setSideAlert] = useState({
        show: false,
        type: '',
        text: ''
    });
    const [sessionDuration, setSessionDuration] = useState(0);

    const getExecutionStatus = () => {
        if (status === 'stopped') return 'Inicia tu reloj'
        if (mode === 'work') return 'A concentrarse!'
        if (mode === 'break') return 'Tomá un descanso corto!'
        if (mode === 'long') return 'Tomá un descanso largo!'
    }

    const updateSessionTimeDuration = (timeFinished) => {
        let minute = parseInt(timeFinished / 60)
        setSessionDuration(minute)
    }

    const handlerPomodoroStart = () => {
        dispatch(startPomodoroCounter());
    }

    const handlerChangePomodoroExecution = () => {
        if (mode === 'work') {
            dispatch(updateSessionDuration({ time: sessionDuration }));
            dispatch(saveSession())
        }
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


    const showSideAlert = ({ type, text }) => {
        setSideAlert({
            show: true,
            type,
            text
        })
    }

    const handleCloseSideAlert = () => {
        setSideAlert({
            show: false,
            type: '',
            text: ''
        });
    }

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
                        _callbackupdateSessionTimeDuration={updateSessionTimeDuration}
                        _callbackPomodoroTimerFinished={handlerChangePomodoroExecution}
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
                <PomodoroDetailForm _callbackShowSideAlert={showSideAlert} />
                <PomodoroHistory />
                {showSettings ?
                    <PomodoroSettings _callbackCloseSettings={handleShowSettings} _callbackShowSideAlert={showSideAlert} />
                    : <></>
                }
                {sideAlert.show &&
                    <SideAlert
                        text={sideAlert.text}
                        type={sideAlert.type}
                        _callback={handleCloseSideAlert}
                    />
                }
            </div>
        </>
    )
}
export default PomodoroApp 