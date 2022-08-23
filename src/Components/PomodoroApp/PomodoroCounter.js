import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import styles from './PomodoroCounter.module.css'

const PomodoroCounter = ()=>{

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">MUy tarde...</div>;
        }

        return (
            <div className="timer">
                <div className="text">Remaining</div>
                <div className="value">{(remainingTime/60).toFixed(1)}</div>
                <div className="text">seconds</div>
            </div>
        );
    };
    return (
        <>
        <div className={styles.container}>
                Comming soon...
                <CountdownCircleTimer
                    isPlaying={true}
                    duration={60*25}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </div>
        </>
    )

}

export default PomodoroCounter