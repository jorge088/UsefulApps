import styles from './PomodoroApp.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import Counter from './Counter';
import Button from "./../../Components/Shared/Button";
import SideAlert from '../../Components/Shared/SideAlert';
import Settings from './Settings';
import DetailForm from './DetailForm';
import History from './History';
import Music from './Music';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import sound from "./../../Assets/PomodoroAlert.mp3";

import {
    startPomodoroCounter,
    startAnimation,
    stopAnimation,
    changePomodoroCounterExecution,
    updateSessionDuration,
    getPomodoroState,
    saveSession
} from "./pomodoroSlice";

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
    let alertSound = new Audio(sound);

    const getExecutionStatus = () => {
        if (status === 'stopped') return 'Inicia tu reloj'
        if (mode === 'work') return 'A concentrarse!'
        if (mode === 'break') return 'Tomá un descanso corto!'
        if (mode === 'long') return 'Tomá un descanso largo!'
    }

    const updateSessionTimeDuration = (timeFinished) => {
        let minute = Math.ceil(timeFinished / 60);
        setSessionDuration(minute);
    }

    const handlerPomodoroStart = () => {
        dispatch(startPomodoroCounter());
    }

    const handlerChangePomodoroExecution = () => {
        if (mode === 'work') {
            dispatch(updateSessionDuration({ time: sessionDuration }));
            dispatch(saveSession());
        }
        dispatch(changePomodoroCounterExecution())
    }

    const handlerStartAnimation = () => {
        dispatch(startAnimation());
    }

    const handlerStopAnimation = () => {
        dispatch(stopAnimation());
    }

    const handleShowSettings = () => {
        setShowSettings(!showSettings);

    }

    useEffect(() => {
        alertSound.muted = true;
        alertSound.play();
        dispatch(stopAnimation());
        // eslint-disable-next-line
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

                    <Counter
                        time={pomodoroTime}
                        animation={running}
                        sound={alertSound}
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
                <DetailForm _callbackShowSideAlert={showSideAlert} />
                <Music />
                <History />

                {
                    showSettings ?
                        <Settings _callbackCloseSettings={handleShowSettings} _callbackShowSideAlert={showSideAlert} />
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