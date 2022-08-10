import styles from './Loading.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.message}>Cargando</h3>
                <FontAwesomeIcon className={styles.icon} icon={faSpinner}></FontAwesomeIcon>
            </div>
        </>
    )

}
export default Loading