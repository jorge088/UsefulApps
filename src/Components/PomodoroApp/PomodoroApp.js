import { useSelector, useDispatch } from 'react-redux';

import {
    getAllSettings,
    getRunning,
    getPomodoroTime,
    getSessionsCount,
    startPomodoroCounter,
    startAnimation,
    stopAnimation,
    changePomodoroCounterExecution
} from '../../features/pomodoroApp/pomodoroSlice';

import styles from './PomodoroApp.module.css';
import PomodoroCounter from './PomodoroCounter'
import Button from '../Shared/Button';

const PomodoroApp = () => {

    const dispatch = useDispatch();
    const settings = useSelector(getAllSettings);
    const pomodoroTime = useSelector(getPomodoroTime);
    const running = useSelector(getRunning);
    const sessionsCount = useSelector(getSessionsCount);

    const getPomodoroStatus = () => {
        let mode = settings.mode;
        if (mode === null) return 'Inicia tu reloj'
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

    return (
        <>
            <div className={styles.container}>
                <div className={styles.appContainer}>
                    <p className={styles.status}>{getPomodoroStatus()}</p>

                    {settings.mode === 'work' ?
                        <p className={styles.sessions}>Pomodoro ({sessionsCount})</p>
                        : ''}

                    <PomodoroCounter
                        time={pomodoroTime}
                        animation={running}
                    />

                    <div className={styles.btnControl}>
                        {settings.mode === null ?
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
                            _callback={settings.mode === null ? handlerPomodoroStart : handlerChangePomodoroExecution}
                            disabled={!running}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default PomodoroApp 