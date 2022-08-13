import styles from './AlertPrincipal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AlertPrincipal = ({ text, icon, closeAlert }) => {


    return (
        <>
            <div className={styles.container}>
                <FontAwesomeIcon icon={icon} className={styles.icon} ></FontAwesomeIcon>
                <p className={styles.message} >{text}</p>
                <button onClick={closeAlert} className={styles.btn}>Cerrar</button>
            </div>
        </>
    )

}

export default AlertPrincipal