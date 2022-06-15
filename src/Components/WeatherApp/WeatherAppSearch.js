import styles from './WeatherAppSearch.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const WeatherAppSearch = () => {
    return (
        <>
            <form className={styles.search}>
                <div className={styles.search__container}>
                    <input
                        className={styles.search__container__input}
                        name='search'
                        type={'text'}
                        placeholder={'City'}>
                    </input>
                    <button className={styles.search__container__icon}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                    </button>

                </div>
            </form>
        </>
    )
}
export default WeatherAppSearch