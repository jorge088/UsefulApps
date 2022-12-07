import { useState } from 'react';
import styles from './PomodoroSettings.module.css';


const PomodoroSettings = ({ _callbackCloseSettings }) => {
    const [showDisappearAnimation, setShowDisappearAnimation] = useState(false);

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
                <p>settings</p>
            </div>

        </div>
    )
}
export default PomodoroSettings