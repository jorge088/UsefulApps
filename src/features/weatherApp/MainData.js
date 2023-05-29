import styles from './MainData.module.css';
import weatherInfoImg from './../../Assets/WeatherAppInfo.svg';

const MainData = ({ data }) => {

    let temperature = '0';
    let city = '';
    if (data.main) {
        temperature = (data.main.temp - 273).toFixed(0);
        city = `${data.name} - ${data.sys.country}`
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <p className={styles.cityName}>{city}</p>
                <div className={styles.tempInfoContainer}>
                    <p className={styles.tempInfoContainer__value}>{temperature}</p>
                    <p className={styles.tempInfoContainer__degree}>°C</p>
                </div>
                <img className={styles.infoImg} src={weatherInfoImg} alt='Weather info presentation'></img>
            </div>
        </>
    )
}
export default MainData