import styles from './History.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { deleteHistoryItem } from './pomodoroSlice';

const HistoryItem = ({ pomodoro }) => {

    const dispatch = useDispatch();

    const handleBtnDeleteClick = (e) => {
        e.preventDefault();
        let id = e.target.id;
        if (!e.target.id) {
            id = e.target.parentElement.parentElement.id;
        }
        dispatch(deleteHistoryItem({ id: parseInt(id) }));
    }

    return (
        <div className={styles.pomodoroItem}>
            <div className={styles.pomodoroData}>{pomodoro.detail.category}</div>
            <div className={`${styles.pomodoroData} ${styles.description}`}>{pomodoro.detail.description}</div>
            <div className={styles.pomodoroData}>{pomodoro.duration}min</div>
            <button
                className={styles.btnDelete}
                id={pomodoro.id}
                onClick={handleBtnDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}
export default HistoryItem