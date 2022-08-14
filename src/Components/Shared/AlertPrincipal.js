import styles from './AlertPrincipal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AlertPrincipal = ({ text, icon, type , closeAlert }) => {

    const handleContainerClick = e =>{
        let classList = e.target.classList
        classList.forEach(item => {
            item.includes('AlertPrincipal_container') && closeAlert();
        });
    }
    
    const setAlertType = () =>{
        if (type === "success") return styles.successAlert; 
        if (type === "error") return styles.errorAlert; 
    }

    return (
        <>
            <div onClick={handleContainerClick} className={styles.container}>
                <div className={`${styles.alertContainer} ${setAlertType()}`}>
                    <FontAwesomeIcon icon={icon} className={styles.icon} ></FontAwesomeIcon>
                    <p className={styles.message} >{text}</p>
                    <button onClick={closeAlert} className={styles.btn}>Cerrar</button>
                </div>
            </div>
        </>
    )

}

export default AlertPrincipal