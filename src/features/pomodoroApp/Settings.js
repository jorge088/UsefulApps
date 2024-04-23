import { useSelector, useDispatch } from 'react-redux';
import { getAllSettings, updateSettings, getMode } from './pomodoroSlice';
import { useState } from 'react';
import styles from './Settings.module.css';
import Button from '../../Components/Shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const Settings = ({ _callbackCloseSettings, _callbackShowSideAlert, _callbackChangePomodoroTime }) => {
    const dispatch = useDispatch();
    const [showDisappearAnimation, setShowDisappearAnimation] = useState(false);
    const settings = useSelector(getAllSettings);
    const pomodoroMode = useSelector(getMode);
    const [pomodoroTimeSetting, setPomodoroTimeSetting] = useState({
        work: settings.work,
        break: settings.break,
        long: settings.long
    });
    const [invalidInput, setInvalidInput] = useState({
        workTime: false,
        breakTime: false,
        longTime: false
    });
    const re = /^[0-9\b]+$/;
    const canSave = pomodoroTimeSetting.work !== '' && pomodoroTimeSetting.break !== '' && pomodoroTimeSetting.long !== '';

    const handleChangeInputTime = (e) => {
        const { name, value } = e.target;
        if (value === '') {
            setPomodoroTimeSetting({
                ...pomodoroTimeSetting,
                [name]: ''
            });
            setInvalidInput({
                ...invalidInput,
                [name]: true
            });
            return;
        }
        if (re.test(value)) {
            setPomodoroTimeSetting({
                ...pomodoroTimeSetting,
                [name]: value
            });
            setInvalidInput({
                ...invalidInput,
                [name]: false
            });
        }
    };

    const handleSubmitPomodoroTimeSettings = (e) => {
        e.preventDefault();
        // console.log(`WORK ${pomodoroTimeSetting.work}, BREAK ${pomodoroTimeSetting.break}, LONG ${pomodoroTimeSetting.breakTime}`);
        if (!canSave) {
            _callbackShowSideAlert({
                type: 'error',
                text: "¡Complete todos los datos!"
            })
            return;
        }
        let updateCounterTime = settings[pomodoroMode] !== Number(pomodoroTimeSetting[pomodoroMode]);
        dispatch(
            updateSettings(
                {
                    workTime: Number(pomodoroTimeSetting.work),
                    breakTime: Number(pomodoroTimeSetting.break),
                    longBreakTime: Number(pomodoroTimeSetting.long)
                }
            ));
        if (updateCounterTime) {
            _callbackChangePomodoroTime(Number(pomodoroTimeSetting[pomodoroMode]) * 60);
        }
        _callbackShowSideAlert({
            type: 'succed',
            text: "¡Configuraciones guardadas!"
        });
    };

    const handleCloseSettings = (e) => {
        if (
            e.target.id === 'container'
            || e.target.parentElement.id === 'icon'
            || e.target.parentElement.id === 'btnCloseSettings'
            || e.target.id === 'btnCloseSettings') {
            setShowDisappearAnimation(true);
            setTimeout(() => {
                _callbackCloseSettings();
            }, 250);
        }
    };

    return (
        <div
            id='container'
            className={styles.container}
            onClick={handleCloseSettings}
        >
            <div
                className={`${styles.settingsContainer} ${showDisappearAnimation ? styles.disappear : ''}`}
            >
                <button
                    className={styles.btnCloseSettings}
                    id="btnCloseSettings"
                    onClick={handleCloseSettings}
                >
                    <FontAwesomeIcon id='icon' icon={faSquareXmark}></FontAwesomeIcon>
                </button>

                <h2>Preferencias</h2>
                <h3>Cronómetro</h3>
                <form className={styles.formSettings} >
                    <div className={styles.formSettings__section}>
                        <label>Duración del Pomodoro:</label>
                        <span className={styles.inputBlock}>
                            <input
                                value={pomodoroTimeSetting.work}
                                name='work'
                                className={invalidInput.workTime ? styles.invalidInput : ''}
                                onChange={handleChangeInputTime}
                            />
                            <p className={styles.inputDescription}>en minutos</p>
                        </span>
                    </div>
                    <div className={styles.formSettings__section}>
                        <label>Duración del descanso:</label>
                        <span className={styles.inputBlock}>
                            <input
                                name='break'
                                value={pomodoroTimeSetting.break}
                                className={invalidInput.breakTime ? styles.invalidInput : ''}
                                onChange={handleChangeInputTime}
                            />
                            <p className={styles.inputDescription}>en minutos</p>
                        </span>
                    </div>
                    <div className={styles.formSettings__section}>
                        <label>Duración del descanso largo:</label>
                        <span className={styles.inputBlock}>
                            <input
                                name='long'
                                value={pomodoroTimeSetting.long}
                                className={invalidInput.longTime ? styles.invalidInput : ''}
                                onChange={handleChangeInputTime}
                            />
                            <p className={styles.inputDescription}>en minutos</p>
                        </span>
                    </div>
                    <div className={styles.formSettings__section}>
                        <Button
                            type={'submit'}
                            content={'Guardar'}
                            _callback={handleSubmitPomodoroTimeSettings}
                            disabled={!canSave}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Settings