import styles from './ExchangeApp.module.css'
import ExchangeAppCalculator from './ExchangeAppCalculator'
import ExchangeAppCurrencyValue from './ExchangeAppCurrencyValue'
import ExchangeAppInformation from './ExchangeAppInformation'

const ExchangeApp = () => {
  return (
    <>
      <div className={styles.exchangeAppContainer}>
        <div className={styles.exchangeApp}>
          <ExchangeAppInformation/>
          <ExchangeAppCurrencyValue/>
          <ExchangeAppCalculator/>
        </div>
      </div>
    </>
  )
}
export default ExchangeApp