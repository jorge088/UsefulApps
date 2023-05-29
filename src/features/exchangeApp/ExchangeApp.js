import { useSelector, useDispatch } from "react-redux";
import { getCurrenciesData, getStatus, fetchCurrencyQuotation } from "./exchangeSlice";

import styles from './ExchangeApp.module.css'
import ExchangeAppCalculator from './Calculator'
import InformationContainer from './InformationContainer'
import Loading from "../../Components/Shared/Loading";
import { useEffect } from "react";


const ExchangeApp = () => {
  const dispatch = useDispatch();
  const currenciesData = useSelector(getCurrenciesData);
  const exchangeStatus = useSelector(getStatus)

  useEffect(() => {
    if (exchangeStatus === 'idle') {
      dispatch(fetchCurrencyQuotation());
    }
  }, [exchangeStatus, dispatch]);

  let content;
  if (exchangeStatus === 'loading') {
    content = <Loading />
  } else if (exchangeStatus === 'succeded') {
    content =
      <div className={styles.exchangeAppContainer}>
        <ExchangeAppCalculator currenciesData={currenciesData} />
        <InformationContainer currenciesData={currenciesData} />
      </div>
  } else if (exchangeStatus === 'failed') {
    <p>FALLÓ</p>
  }

  return (
    <>
      {content}
    </>
  )
}
export default ExchangeApp