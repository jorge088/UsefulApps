import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { getCurrenciesData, getStatus, fetchCurrencyQuotation } from "./exchangeSlice";

import styles from './ExchangeApp.module.css'
import ExchangeAppCalculator from './Calculator'
import InformationContainer from './InformationContainer'
import Loading from "../../Components/Shared/Loading";
import { useEffect } from "react";
import exchangeIcon from "./../../Assets/exchangeAppIcon.ico"


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
      <Helmet>
        <title>Conversor | Useful Apps</title>
        <link rel="icon" type="image/png" href={exchangeIcon} sizes="48x48" ></link>

      </Helmet>
      {content}
    </>
  )
}
export default ExchangeApp