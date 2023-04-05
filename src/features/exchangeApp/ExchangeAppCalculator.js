import styles from './ExchangeAppCalculator.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faEquals } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ExchangeAppCalculator = ({ data }) => {
  const { values: informal_USD } = data.informal_USD
  const [coin, setCoin] = useState("");
  const [peso, setPeso] = useState("");
  const handlerCoinChange = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      setCoin("");
      setPeso("")
      return null;
    }

    let pesoValue = calcPesoValue(parseFloat(e.target.value));

    setCoin(parseFloat(e.target.value))
    setPeso(pesoValue.toFixed(2));
  }

  const handlerPesoChange = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      setCoin("");
      setPeso("");
      return null;
    }

    let coinValue = calcCoinValue(parseFloat(e.target.value));

    setPeso(parseFloat(e.target.value))
    setCoin(coinValue.toFixed(2));
  }

  const changeValues = (e) => {
    e.preventDefault();
  }
  const calcCoinValue = (pesoValue) => {
    return pesoValue / parseFloat(informal_USD.compra);
  }
  const calcPesoValue = (coinValue) => {
    return coinValue * parseFloat(informal_USD.compra);
  }

  return (
    <>
      <div className={styles.calculator}>
        <h2 className={styles.title}>Conversor</h2>
        <form className={styles.formCalculator}>
          <div className={styles.formCalculator__coin}>
            <input
              className={styles.formCalculator__coin__input}
              type='number'
              placeholder='0'
              onChange={handlerCoinChange}
              value={coin}>

            </input>
            <span className={styles.formCalculator__coin__info}>
              <label className={styles.formCalculator__coin__info__name}>USD--</label>
            </span>
          </div>

          <button className={styles.formCalculator__exchange} onClick={changeValues}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>
          </button>

          <div className={styles.formCalculator__coin}>
            <input
              className={styles.formCalculator__coin__input}
              type='number'
              value={peso}
              onChange={handlerPesoChange}
              placeholder='0'>
            </input>
            <span className={styles.formCalculator__coin__info}>
              <label className={styles.formCalculator__coin__info__name}>ARS--</label>
            </span>
          </div>
        </form>

        <div className={styles.currencyConverted}>
          <p className={`${styles.currencyConverted__values} ${styles.convert}`}>$ {coin} USD</p>
          <p className={styles.currencyConverted__icon}>
            <FontAwesomeIcon icon={faEquals} ></FontAwesomeIcon>
          </p>
          <p className={`${styles.currencyConverted__values} ${styles.converted}`}>$ {peso} ARS</p>
        </div>
      </div>
    </>
  )
}
export default ExchangeAppCalculator