import { useSelector, useDispatch } from 'react-redux';

import {
    getAllSettings,
    getMode,
    getRunning,
    getPomodoroTime,
    getSessionsCount,
    startPomodoroCounter,
    startAnimation,
    stopAnimation,
    changePomodoroCounterExecution
} from "./pomodoroSlice"

import styles from './PomodoroApp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import PomodoroCounter from './PomodoroCounter';
import Button from "./../../Components/Shared/Button";
import { useEffect } from 'react';

const PomodoroApp = () => {

    const dispatch = useDispatch();
    const pomodoroTime = useSelector(getPomodoroTime);
    const settings = useSelector(getAllSettings);
    const pomodoroMode = useSelector(getMode);
    const running = useSelector(getRunning);
    const sessionsCount = useSelector(getSessionsCount);
    console.log(settings);

    const getPomodoroStatus = () => {
        let mode = pomodoroMode;
        if (mode === 'start') return 'Inicia tu reloj'
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
    useEffect(() => {
        dispatch(stopAnimation())
    }, [dispatch])



    return (
        <>
            <div className={styles.container}>
                <div className={styles.appContainer}>
                    <button className={styles.settingsBtn}>
                        <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    </button>
                    <p className={styles.status}>{getPomodoroStatus()}</p>

                    {pomodoroMode === 'work' ?
                        <p className={styles.sessions}>Pomodoro ({sessionsCount})</p>
                        : ''
                    }
                    <PomodoroCounter
                        time={pomodoroTime}
                        animation={running}
                    />

                    <div className={styles.btnControl}>
                        {pomodoroMode === 'start' ?
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
                            _callback={pomodoroMode === 'start' ? handlerPomodoroStart : handlerChangePomodoroExecution}
                            disabled={!running}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}
export default PomodoroApp 