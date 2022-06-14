import styles from './ExchangeAppCurrencyValue.module.css';

const ExchangeAppCurrencyValue = () => {
  return (
    <>
      <div className={styles.currencyValueContainer}>
        <p className={styles.currencyValueDate}>- 14/06/2022 -</p>
        <p className={styles.currencyValueData}>1 USD = 202,00 ARS</p>
      </div>
    </>
  )
}
export default ExchangeAppCurrencyValue