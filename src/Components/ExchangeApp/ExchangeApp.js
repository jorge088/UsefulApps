import styles from './ExchangeApp.module.css'
import ExchangeAppCalculator from './ExchangeAppCalculator'
import ExchangeAppCurrencyValue from './ExchangeAppCurrencyValue'
import ExchangeAppInformation from './ExchangeAppInformation'
import Loading from '../Shared/Loading'

import { useExchangeContext } from './../Context/ExchangeContext'


const ExchangeApp = () => {
  const { data } = useExchangeContext();
  
  return (
    <>

      { !data &&
        <Loading/>
      }
      {data &&
        <div className={styles.exchangeAppContainer}>
          <div className={styles.exchangeApp}>
            <ExchangeAppInformation />
            <ExchangeAppCurrencyValue data={data} />
            <ExchangeAppCalculator data={data}/>
          </div>

        </div>
      }

    </>
  )
}
export default ExchangeApp