import styles from './WeatherApp.module.css'
import WeatherAppInformation from './WeatherAppInformation'
import WeatherAppMain from './WeatherAppMain'
import WeatherAppSearch from './WeatherAppSearch'

import { useWeatherAppContext } from '../Context/WeatherAppContext'

const WeatherApp = () => {

  const { data } = useWeatherAppContext(); 
  let temp ='';
  if(data){
    temp = (data.main.temp - 273).toFixed(0);
  }
  
  return (
    <>
      <div className={`${styles.weatherAppContainer} ${temp < 16 ? styles.containerLowTemp : styles.containerHighTemp}`} >
        <div className={`${styles.weatherApp} ${temp < 16 ? styles.appLowTemp : styles.appHighTemp}`}>
          <WeatherAppSearch />
          <WeatherAppMain />
          <WeatherAppInformation />
        </div>
      </div>
    </>
  )
}
export default WeatherApp