import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { selectAllDataWeather, getWeatherStatus, getWeatherError, fetchWeather } from "./weatherSlice";

const WeatherCheck = () => {

  const dispatch = useDispatch();
  const data = useSelector(selectAllDataWeather);
  const error = useSelector(getWeatherError);
  const weatherStatus = useSelector(getWeatherStatus);

  useEffect(() => {
    if (weatherStatus === 'idle') {
      dispatch(fetchWeather("san salvador de jujuy"));
    }
  }, [weatherStatus, dispatch])

  let content;
  if (weatherStatus === 'loading') {
    content = <p>Loading</p>;
  } else if (weatherStatus === 'succeded') {
    content = <p>CLIMA:{(data?.main?.temp - 273).toFixed(0)} + {data?.name}</p>
  } else if (weatherStatus === 'failed') {
    content = <p>MEGA EROR</p>;
  }


  const handleChangeCity = () => {
    dispatch(fetchWeather("córdoba"))
  }
  const handleInputCity = (e) => {
    console.log(e.target.value);
    dispatch(fetchWeather(e.target.value));
  }

  return (
    <div>
      {content}
      <button
        value='Cambiar a Córdoba'
        type="button"
        onClick={handleChangeCity}>

        Cambiar a Córdoba
      </button>
      <input
        type='text'
        name='city'
        onChange={handleInputCity} />
    </div>
  )
}
export default WeatherCheck