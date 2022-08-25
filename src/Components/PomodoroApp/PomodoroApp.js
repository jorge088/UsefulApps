import PomodoroCounter from './PomodoroCounter'
import { usePomodoroContext } from '../Context/PomodoroContext';
import styles from './PomodoroApp.module.css';
import Button from '../Shared/Button';

const PomodoroApp = () => {
    const {
        settings,
        running,
        sessionsCount,
        stopAnimation,
        startPomodoro,
        pomodoroTime,
        startAnimation,
        changeExecution } = usePomodoroContext();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.appContainer}>
                    <p className={styles.sessions}>Pomodoro ({sessionsCount})</p>
                    <PomodoroCounter
                        time={pomodoroTime}
                        animation={running}
                    />
                    <div className={styles.btnControl}>
                        {settings.mode === null ?
                            <Button
                                type={'classic'}
                                content={'Iniciar'}
                                _callback={() => { startPomodoro() }}
                            />
                            :
                            <Button
                                type={'classic'}
                                content={`${running ? 'Pausar' : 'Continuar'}`}
                                _callback={running ? stopAnimation : startAnimation}
                            />
                        }
                        <Button
                            type={'close'}
                            content={'Omitir'}
                            _callback={settings.mode === null ? () => { startPomodoro() } : changeExecution}
                            disabled={!running}
                        />
                    </div>
                </div>


            </div>



        </>
    )
}
export default PomodoroApp 