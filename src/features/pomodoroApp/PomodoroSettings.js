import { useSelector } from 'react-redux';
import { getAllSettings } from './pomodoroSlice';
import { useState } from 'react';


import styles from './PomodoroSettings.module.css';


const PomodoroSettings = ({ _callbackCloseSettings }) => {
    const [showDisappearAnimation, setShowDisappearAnimation] = useState(false);
    const settings = useSelector(getAllSettings);

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
                <form className={styles.formSettings}>
                    <div className={styles.formSettings__section}>
                        <label>Duración del Pomodoro:</label>
                        <input
                            type='number'
                            value={settings.work}
                        />
                    </div>
                    <div className={styles.formSettings__section}>
                        <label>Duración del descanso:</label>
                        <input
                            type='number'
                            value={settings.break}
                        />
                    </div>
                    <div className={styles.formSettings__section}>
                        <label>Duración del descanso largo:</label>
                        <input
                            type='number'
                            value={settings.long}
                        />
                    </div>
                </form>
            </div>

        </div>
    )
}
export default PomodoroSettings