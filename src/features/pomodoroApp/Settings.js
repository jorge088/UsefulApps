import { useSelector, useDispatch } from 'react-redux';
import { getAllSettings, updatePomodoroTime } from './pomodoroSlice';
import { useState } from 'react';

import styles from './Settings.module.css';
import Button from '../../Components/Shared/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

const Settings = ({ _callbackCloseSettings, _callbackShowSideAlert }) => {
    const dispatch = useDispatch();
    const [showDisappearAnimation, setShowDisappearAnimation] = useState(false);


    const settings = useSelector(getAllSettings);

    const [pomodoroSetting, setPomodoroSettings] = useState({
        workTime: settings.work,
        breakTime: settings.break,
        longTime: settings.long
    });

    const [invalidInput, setInvalidInput] = useState({
        workTime: false,
        breakTime: false,
        longTime: false
    })

    const re = /^[0-9\b]+$/;

    const canSave = pomodoroSetting.workTime !== '' && pomodoroSetting.breakTime !== '' && pomodoroSetting.longTime !== '';

    const handleChangeInputTime = (e) => {
        const { name, value } = e.target;

        if (value === '') {
            setPomodoroSettings({
                ...pomodoroSetting,
                [name]: ''
            })
            setInvalidInput({
                ...invalidInput,
                [name]: true
            })
            return
        }

        if (re.test(value)) {
            setPomodoroSettings({
                ...pomodoroSetting,
                [name]: value
            })
            setInvalidInput({
                ...invalidInput,
                [name]: false
            })
        }
    }

    const handleSubmitPomodoroSettings = (e) => {
        e.preventDefault();
        // console.log(`WORK ${pomodoroSetting.workTime}, BREAK ${pomodoroSetting.breakTime}, LONG ${pomodoroSetting.breakTime}`);
        if (!canSave) {
            _callbackShowSideAlert({
                type: 'error',
                text: "¡Complete todos los datos!"
            })
            return;
        }
        dispatch(
            updatePomodoroTime(
                {
                    workTime: Number(pomodoroSetting.workTime),
                    breakTime: Number(pomodoroSetting.breakTime),
                    longBreakTime: Number(pomodoroSetting.longTime)
                }
            ));
        _callbackShowSideAlert({
            type: 'succed',
            text: "¡Configuraciones guardadas!"
        })

    }

    const handleCloseSettings = (e) => {
        if (
            e.target.id === 'container'
            || e.target.parentElement.id === 'icon'
            || e.target.parentElement.id === 'btnCloseSettings'
            || e.target.id === 'btnCloseSettings') {
            setShowDisappearAnimation(true)
            setTimeout(() => {
                _callbackCloseSettings();

            }, 250)
        }
    }

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
                                value={pomodoroSetting.workTime}
                                name='workTime'
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
                                name='breakTime'
                                value={pomodoroSetting.breakTime}
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
                                name='longTime'
                                value={pomodoroSetting.longTime}
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
                            _callback={handleSubmitPomodoroSettings}
                            disabled={!canSave}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Settings