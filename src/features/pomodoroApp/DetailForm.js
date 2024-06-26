import styles from './PomodoroApp.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePomodoroDetail } from './pomodoroSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const DetailForm = ({ _callbackHandleSideAlert }) => {
    const [detail, setDetail] = useState({
        category: '',
        description: ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const storageDetail = JSON.parse(localStorage.getItem('PomodoroSessionDetail'));
        if( storageDetail ){
            setDetail({
                category: storageDetail.category,
                description: storageDetail.description
            });
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetail({
            ...detail,
            [name]: value
        })
    };

    const handleFormDetailSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePomodoroDetail({
            category: detail.category,
            description: detail.description
        }));
        _callbackHandleSideAlert({
            show: true,
            type: 'succed',
            text: '¡Datos guardados!'
        });
    };

    return (
        <div>
            <form className={styles.detailForm} onSubmit={handleFormDetailSubmit}>
                <div>
                    <input
                        className={`${styles.detailInput} ${styles.categoryInput}`}
                        id='category'
                        name='category'
                        type='text'
                        placeholder='Categoria'
                        value={detail.category}
                        onChange={handleInputChange} />
                </div>
                <div>
                    <input
                        className={`${styles.detailInput} ${styles.descriptionInput}`}
                        name='description'
                        id='description'
                        type='text'
                        placeholder='Descripcion'
                        value={detail.description}
                        onChange={handleInputChange} />
                </div>
                <button className={styles.btnSubmitDetail}>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </button>
            </form>
        </div>
    )
}
export default DetailForm