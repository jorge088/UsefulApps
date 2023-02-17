import { useSelector, useDispatch } from "react-redux";
import { selectAllDataQuotation, getStatus, fetchQuotation } from "./exchangeSlice";

import styles from './ExchangeApp.module.css'
import ExchangeAppCalculator from './ExchangeAppCalculator'
import ExchangeAppInformation from './ExchangeAppInformation'
import Loading from "../../Components/Shared/Loading";
import { useEffect } from "react";


const ExchangeApp = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllDataQuotation);
  const exchangeStatus = useSelector(getStatus)

  useEffect(() => {
    if (exchangeStatus === 'idle') {
      dispatch(fetchQuotation());
    }
  }, [exchangeStatus, dispatch]);
  let content;
  if (exchangeStatus === 'loading') {
    content = <Loading />
  } else if (exchangeStatus === 'succeded') {
    content =
      <div className={styles.exchangeAppContainer}>
        <div className={styles.exchangeApp}>
          <ExchangeAppInformation data={data} />
          <ExchangeAppCalculator data={data} />
        </div>
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