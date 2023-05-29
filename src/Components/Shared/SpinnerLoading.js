import styles from './Loading.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const SpinnerLoading = () => {
    return (
        <div className={styles.spinnerContainer}>
            <h3 className={styles.spinnerText}>Cargando</h3>
            <FontAwesomeIcon className={styles.icon} icon={faSpinner}></FontAwesomeIcon>
        </div>
    )
}
export default SpinnerLoading