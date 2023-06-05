import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllDataWeather, getWeatherStatus, fetchWeather } from '../../features/weatherApp/weatherSlice';

import styles from './WeatherApp.module.css';
import Information from './Information';
import MainData from './MainData';
import Search from './Search';
import Loading from '../../Components/Shared/Loading';

import weatherAppIcon from "./../../Assets/weatherAppIcon.ico"

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
          <Search />
          <MainData data={data} />
          <Information data={data} />
        </div>
      </div>
  }

  return (
    <>
      <Helmet>
        <title>Clima | Useful Apps</title>
        <link rel="icon" type="image/png" href={weatherAppIcon} sizes="48x48" ></link>

      </Helmet>
      {content}
    </>
  )
}

export default WeatherApp