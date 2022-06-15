import styles from './WeatherAppInformation.module.css';
import WeatherAppInformationTopic from './WeatherAppInformationTopic';
import { faWind, faCloud, faWater, faGauge } from '@fortawesome/free-solid-svg-icons';

const WeatherAppInformation = () => {
    return (
        <>
            <div className={styles.informationContainer}>
                <WeatherAppInformationTopic topic={'Velocidad del viento'} topicValue={'3.08 m/s'} topicIcon={ faWind } />
                <WeatherAppInformationTopic topic={'Nubosidad'} topicValue={'0 %'} topicIcon={ faCloud } />
                <WeatherAppInformationTopic topic={'Humedad'} topicValue={'59 %'} topicIcon={ faWater } />
                <WeatherAppInformationTopic topic={'Presión'} topicValue={'965 hPa'} topicIcon={ faGauge } />
            </div>
        </>
    )
}
export default WeatherAppInformation