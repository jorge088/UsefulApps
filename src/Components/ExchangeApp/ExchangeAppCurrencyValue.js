import styles from './ExchangeAppCurrencyValue.module.css';

const ExchangeAppCurrencyValue = ({ data } ) => {
  let fecha = data.fecha.slice(0,10);
  return (
    <>
      <div className={styles.currencyValueContainer}>
        <p className={styles.currencyValueDate}>- {fecha} -</p>
        <p className={styles.currencyValueData}>1 USD = {data.compra} ARS</p>
      </div>
    </>
  )
}
export default ExchangeAppCurrencyValue