import styles from './WeatherAppMain.module.css';
import weatherInfoImg from './../../Assets/WeatherAppInfo.svg';

const WeatherAppMain = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <p className={styles.cityName}>San Salvador de Jujuy - AR</p>
                <div className={styles.tempInfoContainer}>
                    <p className={styles.tempInfoContainer__value}>25</p>
                    <p className={styles.tempInfoContainer__degree}>°C</p>
                </div>
                <img className={styles.infoImg} src={weatherInfoImg} alt='Weather info presentation'></img>
            </div>
        </>
    )
}
export default WeatherAppMain