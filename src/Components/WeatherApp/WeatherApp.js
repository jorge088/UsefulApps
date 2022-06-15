import styles from './WeatherApp.module.css'
import WeatherAppInformation from './WeatherAppInformation'
import WeatherAppMain from './WeatherAppMain'
import WeatherAppSearch from './WeatherAppSearch'
const WeatherApp = () => {
  return (
    <>
      <div className={styles.weatherAppContainer}>
        <div className={styles.weatherApp}>
            <WeatherAppSearch/>
            <WeatherAppMain/>
            <WeatherAppInformation/>
        </div>  
      </div>
    </>
  )
}
export default WeatherApp