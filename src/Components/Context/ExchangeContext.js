import { createContext, useContext, useEffect, useState } from "react";

const ExchangeContext = createContext();
export const useExchangeContext = () => useContext(ExchangeContext);

const ExchangeContextProvider = ({ children }) => {
    const [data,setData] = useState(null);
    const fetchData = async () =>{
        let url = "https://mercados.ambito.com/dolar/informal/variacion";
        const response = await fetch(url)
        const responseJson = await response.json();
        setData(responseJson)
    }
    
    useEffect(() => {
      fetchData();
    }, [])
    

    return <ExchangeContext.Provider value={{ data }}>
        { children }
    </ExchangeContext.Provider>
}
export default ExchangeContextProvider;