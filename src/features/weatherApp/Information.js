import styles from './Information.module.css';
import Topic from './Topic';
import { faWind, faCloud, faWater, faGauge } from '@fortawesome/free-solid-svg-icons';

const Information = ({ data }) => {
    let windSpeed = '';
    let clouds = '';
    let humidity = '';
    let pressure = '';

    if (data.main) {
        windSpeed = data.wind.speed;
        clouds = data.clouds.all;
        humidity = data.main.humidity;
        pressure = data.main.pressure
    }

    return (
        <>
            <div className={styles.informationContainer}>
                <Topic topic={'Velocidad del viento'} topicValue={`${windSpeed} m/s`} topicIcon={faWind} />
                <Topic topic={'Nubosidad'} topicValue={`${clouds} %`} topicIcon={faCloud} />
                <Topic topic={'Humedad'} topicValue={`${humidity} %`} topicIcon={faWater} />
                <Topic topic={'Presión'} topicValue={`${pressure} hPa`} topicIcon={faGauge} />
            </div>
        </>
    )
}
export default Information