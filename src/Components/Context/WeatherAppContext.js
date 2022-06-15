import { createContext, useContext, useEffect, useState } from "react";

const WeatherAppContext = createContext();
export const useWeatherAppContext = () => useContext(WeatherAppContext);

const WeatherAppContextProvider = ({ children }) =>{

    const [data, setData] = useState(null);

    const fetchData = async (city) => {
        const apiKey = 'e701a532701479b60c02d39b4d58395c'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const response = await fetch(url)
        if(response.status === 404) {
            setData(null);
            return
        }
        const responseJson = await response.json();
        setData(responseJson);
    }

    const searchCityTemp = (city) =>{
        fetchData(city);
    }

    useEffect(() => {
        fetchData('cordoba');
    }, [])
    
    return <WeatherAppContext.Provider value={{ data ,searchCityTemp }}>
        { children }
    </WeatherAppContext.Provider>

}
export default WeatherAppContextProvider;