import { useSelector, useDispatch } from 'react-redux';
import { getAllSettings, updatePomodoroTime } from './pomodoroSlice';
import { useState } from 'react';

import styles from './PomodoroSettings.module.css';
import Button from '../../Components/Shared/Button';

const PomodoroSettings = ({ _callbackCloseSettings }) => {
    const dispatch = useDispatch();
    const [showDisappearAnimation, setShowDisappearAnimation] = useState(false);
    const settings = useSelector(getAllSettings);
    const [workTime, setWorkTime] = useState(settings.work);
    const [breakTime, setBreakTime] = useState(settings.break);
    const [longBreakTime, setLongBreakTime] = useState(settings.long);


    const handleWorkTimeChange = (e) => {
        if (e.target.value > 0) {
            setWorkTime(Number(e.target.value));
        }
    }

    const handleBreakTimeChange = (e) => {
        if (e.target.value > 0) {
            setBreakTime(Number(e.target.value));
        }
    }

    const handleLongBreakTimeChange = (e) => {
        if (e.target.value > 0) {
            setLongBreakTime(Number(e.target.value));
        }
    }

    const handleSubmitPomodoroSettings = (e) => {
        e.preventDefault();
        console.log(`WORK ${workTime}, BREAK ${breakTime}, LONG ${longBreakTime}`);
        dispatch(
            updatePomodoroTime(
                {
                    workTime: workTime,
                    breakTime: breakTime,
                    longBreakTime: longBreakTime
                }
            ))
    }

    const handleCloseSettings = (e) => {
        if (e.target.id === 'container') {
            setShowDisappearAnimation(true)
            setTimeout(() => {
                _callbackCloseSettings()

            }, 250)
        }
    }

    return (
        <div
            id='container'
            className={styles.container}
            onClick={handleCloseSettings}>

            <div
                className={`${styles.settingsContainer} ${showDisappearAnimation ? styles.disappear : ''}`}>
                <h2>Preferencias</h2>
                <h3>Cronómetro</h3>
                <form className={styles.formSettings} >
                    <div className={styles.formSettings__section}>
                        <label>Duración del Pomodoro:</label>
                        <input
                            type='number'
                            value={workTime}
                            onChange={handleWorkTimeChange}
                        />
                    </div>
                    <div className={styles.formSettings__section}>
                        <label>Duración del descanso:</label>
                        <input
                            type='number'
                            value={breakTime}
                            onChange={handleBreakTimeChange}
                        />
                    </div>
                    <div className={styles.formSettings__section}>
                        <label>Duración del descanso largo:</label>
                        <input
                            type='number'
                            value={longBreakTime}
                            onChange={handleLongBreakTimeChange}
                        />
                    </div>
                    <div className={styles.formSettings__section}>
                        <Button
                            type={'submit'}
                            content={'Guardar'}
                            _callback={handleSubmitPomodoroSettings}
                        />
                    </div>
                </form>

            </div>

        </div>
    )
}
export default PomodoroSettings