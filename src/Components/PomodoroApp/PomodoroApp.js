import PomodoroCounter from './PomodoroCounter'
import { usePomodoroContext } from '../Context/PomodoroContext';
import styles from './PomodoroApp.module.css';
import Button from '../Shared/Button';

const PomodoroApp = () => {
    const { settings,
        running,
        stopAnimation,
        startPomodoro,
        pomodoroTime,
        startAnimation,
        changeExecution } = usePomodoroContext();

    return (
        <>
            <div className={styles.container}>
                <PomodoroCounter
                    time={pomodoroTime}
                    animation={running}
                />
                <div className={styles.btnControl}>
                    {settings.mode === null ?
                        <Button
                            content={'Iniciar'}
                            _callback={()=>{startPomodoro()}}
                        />
                        :
                        <Button
                            content={`${running ? 'Pausar' : 'Continuar'}`}
                            _callback={running ? stopAnimation : startAnimation}
                        />
                    }
                    <Button
                        content={'Omitir'}
                        _callback={settings.mode===null ? ()=>{startPomodoro()} : changeExecution}
                        disabled={!running}
                    />
                </div>

            </div>



        </>
    )
}
export default PomodoroApp 