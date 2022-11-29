import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllDataWeather, getWeatherStatus, fetchWeather } from '../../features/weatherApp/weatherSlice';

import styles from './WeatherApp.module.css';
import WeatherAppInformation from './WeatherAppInformation';
import WeatherAppMain from './WeatherAppMain';
import WeatherAppSearch from './WeatherAppSearch';
import Loading from '../Shared/Loading';


const WeatherApp = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllDataWeather);
  const weatherStatus = useSelector(getWeatherStatus);

  useEffect(() => {
    if (weatherStatus === 'idle') {
      dispatch(fetchWeather("Córdoba"));
    }

  }, [weatherStatus, dispatch]);

  let temp = '';
  let content;
  if (weatherStatus === 'loading') {
    content = <Loading />
  } else if (weatherStatus === 'succeded') {
    if (data.main) {
      temp = (data.main.temp - 273).toFixed(0);
    }
    content =
      <div className={`${styles.weatherAppContainer} ${temp < 16 ? styles.containerLowTemp : styles.containerHighTemp}`} >
        <div className={`${styles.weatherApp} ${temp < 16 ? styles.appLowTemp : styles.appHighTemp}`}>
          <WeatherAppSearch />
          <WeatherAppMain data={data} />
          <WeatherAppInformation data={data} />
        </div>
      </div>
  }

  return (
    <>
      {content}
    </>
  )
}

export default WeatherApp