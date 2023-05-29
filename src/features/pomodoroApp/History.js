import styles from './History.module.css';
import HistoryItem from './HistoryItem';
import { useSelector, useDispatch } from 'react-redux';
import { getHistory, getHistoryFromStorage } from './pomodoroSlice';
import { useEffect } from 'react';

const History = () => {
    const history = useSelector(getHistory);
    const dispatch = useDispatch();
    let pomodoros = history.map((pom) => <HistoryItem pomodoro={pom} key={pom.id} />);
    let pomodorosLength = history.length;
    useEffect(() => {
        dispatch(getHistoryFromStorage());
    }, [dispatch])


    return (
        <div className={styles.pomodoroHistoryContainer}>
            <div className={styles.lengthContainer}>
                <p className={styles.pomodoroLength}>HECHO {pomodorosLength}</p>
            </div>
            <div className={styles.historyHeaders}>
                <div className={styles.headers} >CATEGORIA</div>
                <div className={`${styles.headers} ${styles.description}`} >DESCRIPCIÓN</div>
            </div>
            {pomodoros}
        </div>
    )
}
export default History