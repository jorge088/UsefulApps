import PomodoroCounter from './PomodoroCounter'

import styles from './PomodoroApp.module.css';
import Button from '../Shared/Button';

const PomodoroApp = () => {



    return (
        <>
            <div className={styles.container}>
                <PomodoroCounter />
                <div className={styles.btnControl}>
                    <Button content={'Iniciar'} />
                    <Button content={'Parar'} />
                </div>

            </div>



        </>
    )
}
export default PomodoroApp 