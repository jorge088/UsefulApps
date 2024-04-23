import styles from './PomodoroApp.module.css';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from "./../../Components/Shared/Button";
import SideAlert from '../../Components/Shared/SideAlert';
import Settings from './Settings';
import DetailForm from './DetailForm';
import History from './History';
import Music from './Music';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import sound from "./../../Assets/PomodoroAlert.mp3";
import pomodoroIcon from './../../Assets/pomodoroIcon.ico';
import pomodoroIconBreak from './../../Assets/pomodoroIcon2.ico';
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
    const [counterTime, setCounterTime] = useState(pomodoroTime * 60);
    const [showSettings, setShowSettings] = useState(false);
    const [sideAlert, setSideAlert] = useState({
        show: false,
        type: '',
        text: ''
    });

    let alertSound = new Audio(sound);
    const getExecutionStatus = () => {
        if (status === 'stopped') return 'Inicia tu reloj'
        if (mode === 'work') return 'A concentrarse!'
        if (mode === 'break') return 'Tomá un descanso corto!'
        if (mode === 'long') return 'Tomá un descanso largo!'
    };

    useEffect(() => {
        let interval;
        if (status === 'stopped') {
            setCounterTime(pomodoroTime * 60);
        }
        if (running && counterTime > 0) {
            interval = setInterval(() => {
                setCounterTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (counterTime === 0 && status === 'running') {
            clearInterval(interval);
            alertSound.muted = false;
            alertSound.play();
            handlerChangePomodoroExecution();
        }
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [dispatch, counterTime, running]);

    const handlerPomodoroStart = () => {
        dispatch(startPomodoroCounter());
    };

    const handlerChangePomodoroExecution = () => {
        handlerStopAnimation();
        if (mode === 'work') {
            if (counterTime === 0) {
                dispatch(updateSessionDuration({ time: pomodoroTime }));
            } else {
                dispatch(updateSessionDuration({ time: Math.ceil((pomodoroTime * 60 - counterTime) / 60) }));
            }
            dispatch(saveSession());
        }
        dispatch(changePomodoroCounterExecution());
    }

    const handlerStartAnimation = () => {
        dispatch(startAnimation());
    };

    const handlerStopAnimation = () => {
        dispatch(stopAnimation());
    };

    const handleShowSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleEsc = (e) => {
        if (e.key === 'Escape' && showSettings) handleShowSettings();
    };

    window.addEventListener('keydown', handleEsc)

    const showSideAlert = ({ type, text }) => {
        setSideAlert({
            show: true,
            type,
            text
        });
    };

    const handleCloseSideAlert = () => {
        setSideAlert({
            show: false,
            type: '',
            text: ''
        });
    };

    const getTitle = () => {
        if (status === 'stopped') return 'Pomodoro | Useful Apps';
        if (status === 'running' && running) {
            if (mode === 'work') return 'En ejecución - Pomodoro';
            if (mode === 'break') return 'Descanso corto - Pomodoro';
            if (mode === 'long') return 'Descanso largo - Pomodoro';
        } else {
            return 'Pomodoro | Useful Apps';
        }
    };

    const getIcon = () => {
        if (status === 'stopped') return pomodoroIcon;
        if (!running) return pomodoroIcon;
        if (mode === 'work') return pomodoroIcon;
        if (mode === 'break') return pomodoroIconBreak;
        if (mode === 'long') return pomodoroIconBreak;
    };

    const formatTime = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let secondsLeft = seconds % 60;
        return minutes + ":" + (secondsLeft < 10 ? "0" : "") + secondsLeft;
    };

    return (
        <>
            <div className={styles.container}>
                <Helmet>
                    <title>{getTitle()}</title>
                    <link rel="icon" type="image/png" href={getIcon()} sizes="48x48" ></link>
                </Helmet>
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
                    <div className={`${styles.counter} ${mode === 'work' ? styles.counterOutlineWork : styles.counterOutlineBreak}`}>
                        <p>{formatTime(counterTime)}</p>
                    </div>

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
                        <Settings _callbackCloseSettings={handleShowSettings} _callbackShowSideAlert={showSideAlert} _callbackChangePomodoroTime={setCounterTime} />
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