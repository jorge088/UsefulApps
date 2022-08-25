import { usePomodoroContext } from '../Context/PomodoroContext';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import sound from './../../Assets/PomodoroAlert.mp3'
import styles from './PomodoroCounter.module.css'

const PomodoroCounter = ({ time, animation = true }) => {
    const {changeExecution} = usePomodoroContext();
    let alertSound = new Audio(sound);
    let circleColor = '#da2a2a';
    if (time === 25) circleColor = '#da2a2a';
    if (time === 5) circleColor = '#24bb24';
    
    const renderTime = ({ remainingTime }) => {
        
        let minutes = Math.floor(remainingTime / 60)
        let seconds = remainingTime % 60;
        if (`${minutes}`.length === 1) minutes = `${minutes}`.padStart(2, '0');
        if (`${seconds}`.length === 1) seconds = `${seconds}`.padStart(2, '0');
        return (
            `${minutes}:${seconds}`
        );
    };
    return (
        <>
            <div className={styles.container}>
                <CountdownCircleTimer
                    key={time}
                    isPlaying={animation}
                    duration={time*60}
                    colors={[circleColor]}
                    onComplete={()=>{
                        alertSound.play()
                        changeExecution()
                    }}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </div>
        </>
    )

}

export default PomodoroCounter