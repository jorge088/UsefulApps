import styles from './WeatherAppInformation.module.css';
import WeatherAppInformationTopic from './WeatherAppInformationTopic';
import { useWeatherAppContext } from '../Context/WeatherAppContext';
import { faWind, faCloud, faWater, faGauge } from '@fortawesome/free-solid-svg-icons';

const WeatherAppInformation = () => {
    const { data } = useWeatherAppContext();

    let windSpeed = '';
    let clouds = '';
    let humidity = '';
    let pressure = '';

    if (data) {
        windSpeed = data.wind.speed;
        clouds = data.clouds.all;
        humidity = data.main.humidity;
        pressure = data.main.pressure
    }

    return (
        <>
            <div className={styles.informationContainer}>
                <WeatherAppInformationTopic topic={'Velocidad del viento'} topicValue={`${windSpeed} m/s`} topicIcon={faWind} />
                <WeatherAppInformationTopic topic={'Nubosidad'} topicValue={`${clouds} %`} topicIcon={faCloud} />
                <WeatherAppInformationTopic topic={'Humedad'} topicValue={`${humidity} %`} topicIcon={faWater} />
                <WeatherAppInformationTopic topic={'Presión'} topicValue={`${pressure} hPa`} topicIcon={faGauge} />
            </div>
        </>
    )
}
export default WeatherAppInformation