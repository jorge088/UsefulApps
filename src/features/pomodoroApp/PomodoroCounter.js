import { useSelector } from 'react-redux';
import { getMode } from './pomodoroSlice';

import styles from './PomodoroCounter.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import sound from "./../../Assets/PomodoroAlert.mp3"

const PomodoroCounter = ({ time, animation = true, _callbackupdateSessionTimeDuration, _callbackPomodoroTimerFinished }) => {
    const mode = useSelector(getMode);
    let alertSound = new Audio(sound);

    let circleColor = '#db4242';
    if (mode === 'work') circleColor = '#db4242';
    if (mode === 'break') circleColor = '#0ebe0e';
    if (mode === 'long') circleColor = '#0ebe0e';



    const renderTime = ({ remainingTime }) => {
        // console.log(remainingTime);
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        if (`${minutes}`.length === 1) minutes = `${minutes}`.padStart(2, '0');
        if (`${seconds}`.length === 1) seconds = `${seconds}`.padStart(2, '0');
        return (
            <p className={styles.time}>{minutes}:{seconds}</p>
        );
    };

    const handlerTimeCounterComplete = () => {
        alertSound.play();
        _callbackPomodoroTimerFinished();
    }

    const handleSessionTimeFinished = (timeRemaining) => {
        let finished = (time * 60) - timeRemaining;
        // console.log('Tiempo completado[segundos]', finished);
        _callbackupdateSessionTimeDuration(finished)
    }

    return (
        <>
            <CountdownCircleTimer
                key={time}
                isPlaying={animation}
                duration={time * 60}
                colors={[circleColor]}
                className={styles.time}
                size={180}
                strokeWidth={13}
                onComplete={handlerTimeCounterComplete}
                onUpdate={(remainingTime) => { mode === 'work' && handleSessionTimeFinished(remainingTime) }}
            >
                {renderTime}
            </CountdownCircleTimer>
        </>
    )

}

export default PomodoroCounter