import styles from './ExchangeAppCalculator.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faEquals } from '@fortawesome/free-solid-svg-icons';
const ExchangeAppCalculator = () => {
  return (
    <>
      <form className={styles.currencyCalculator}>
        <div className={styles.currencyCalculator__coin}>
          <label className={styles.currencyCalculator__coin__name}>Dolar</label>
          <input
            className={styles.currencyCalculator__coin__input}
            type='number'
            placeholder='0'>
          </input>
        </div>
        <div className={styles.currencyCalculator__exchange}>
          <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>
        </div>
        <div className={styles.currencyCalculator__coin}>
          <label className={styles.currencyCalculator__coin__name}>Peso AR</label>
          <input
            className={styles.currencyCalculator__coin__input}
            type='number'
            placeholder='0'>
          </input>
        </div>
      </form>
      <div className={styles.currencyConverted}>
        <p className={styles.currencyConverted__values}>$ 0,000 USD</p>
        <p className={styles.currencyConverted__icon}>
          <FontAwesomeIcon icon={ faEquals } ></FontAwesomeIcon>
        </p>
        <p className={styles.currencyConverted__values}>$ 0,000 ARS</p>
      </div>
    </>
  )
}
export default ExchangeAppCalculator