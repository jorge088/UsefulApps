import styles from './ExchangeAppCalculator.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faEquals } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const ExchangeAppCalculator = ({ data }) => {
  const [coin, setCoin] = useState("");
  const [peso, setPeso] = useState("");

  const handlerCoinChange = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      setCoin("");
      setPeso("")
      return null;
    }

    let pesoValue = calcPesoValue( parseFloat(e.target.value) );

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

    let coinValue = calcCoinValue( parseFloat(e.target.value) );

    setPeso(parseFloat(e.target.value))
    setCoin(coinValue.toFixed(2));
  }

  const changeValues = (e) =>{
    e.preventDefault();
  }
  const calcCoinValue = (pesoValue) => {
    return pesoValue / parseFloat(data.compra); 
  }
  const calcPesoValue = (coinValue) =>{
    return coinValue * parseFloat(data.compra);
  }

  return (
    <>
      <form className={styles.currencyCalculator}>

        <div className={styles.currencyCalculator__coin}>
          <label className={styles.currencyCalculator__coin__name}>Dolar</label>
          <input
            className={styles.currencyCalculator__coin__input}
            type='number'
            placeholder='0'
            onChange={handlerCoinChange}
            value={coin}>

          </input>
        </div>

        <button className={styles.currencyCalculator__exchange} onClick={changeValues}>
          <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>
        </button>

        <div className={styles.currencyCalculator__coin}>
          <label className={styles.currencyCalculator__coin__name}>Peso AR</label>
          <input
            className={styles.currencyCalculator__coin__input}
            type='number'
            value={peso}
            onChange={handlerPesoChange}
            placeholder='0'>
          </input>
        </div>
      </form>

      <div className={styles.currencyConverted}>
        <p className={styles.currencyConverted__values}>$ {coin} USD</p>
        <p className={styles.currencyConverted__icon}>
          <FontAwesomeIcon icon={faEquals} ></FontAwesomeIcon>
        </p>
        <p className={styles.currencyConverted__values}>$ {peso} ARS</p>
      </div>
    </>
  )
}
export default ExchangeAppCalculator