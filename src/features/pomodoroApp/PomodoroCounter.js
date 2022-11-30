import { useDispatch } from 'react-redux';
import { changePomodoroCounterExecution } from './pomodoroSlice';

import styles from './PomodoroCounter.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import sound from "./../../Assets/PomodoroAlert.mp3"

const PomodoroCounter = ({ time, animation = true }) => {

    const dispatch = useDispatch();

    let alertSound = new Audio(sound);
    let circleColor = '#db4242';
    if (time === 25) circleColor = '#db4242';
    if (time === 5) circleColor = '#0ebe0e';

    const renderTime = ({ remainingTime }) => {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        if (`${minutes}`.length === 1) minutes = `${minutes}`.padStart(2, '0');
        if (`${seconds}`.length === 1) seconds = `${seconds}`.padStart(2, '0');
        return (
            <p className={styles.time}>{minutes}:{seconds}</p>
        );
    };

    const handlerTimeCounterComplete = () =>{
        alertSound.play();
        dispatch(changePomodoroCounterExecution());
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
            >
                {renderTime}
            </CountdownCircleTimer>
        </>
    )

}

export default PomodoroCounter