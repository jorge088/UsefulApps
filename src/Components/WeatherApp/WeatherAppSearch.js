import styles from './WeatherAppSearch.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useWeatherAppContext } from '../Context/WeatherAppContext';
import { useState } from 'react';

const WeatherAppSearch = () => {
    const { searchCityTemp } = useWeatherAppContext();
    const [cityName, setCityName] = useState('');

    const handlerSearchCityChange = (e) =>{
        e.preventDefault();
        setCityName(e.target.value);
    }

    const handlerSearchCitySubmit = (e) =>{
        e.preventDefault();
        searchCityTemp(cityName);
    }

    return (
        <>
            <form className={styles.search} onSubmit={handlerSearchCitySubmit}>
                <div className={styles.search__container}>
                    <input
                        className={styles.search__container__input}
                        name='search'
                        type={'text'}
                        placeholder={'City'}
                        onChange={handlerSearchCityChange}>
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