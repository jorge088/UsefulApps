import styles from './ExchangeAppCalculator.module.css';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals } from '@fortawesome/free-solid-svg-icons';

import argentinaBrandImg from '../../Assets/argentinaBrand.png'
import unitedStateBrandImg from '../../Assets/unitedStatesBrand.png'


const ExchangeAppCalculator = ({ data }) => {
  const { values: informal_USD } = data.informal_USD
  const [coin, setCoin] = useState("");
  const [peso, setPeso] = useState("");

  const re = /^[0-9\b]+$/;


  const handlerCoinChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value === '') {
      setCoin('')
      setPeso('')
      return
    }

    if (value === '' || re.test(value)) {
      let pesoValue = calcPesoValue(parseFloat(value));
      setCoin(parseFloat(e.target.value))
      setPeso(pesoValue);
    }
  }

  const handlerPesoChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value === '') {
      setCoin('')
      setPeso('')
      return
    }

    if (value === '' || re.test(value)) {
      let coinValue = calcCoinValue(parseFloat(e.target.value));
      setPeso(parseFloat(e.target.value))
      setCoin(coinValue);

    }
  }

  // const changeValues = (e) => {
  //   e.preventDefault();
  //   let pesoValue = coin;
  //   let coinValue = calcCoinValue(pesoValue);


  //   setPeso(pesoValue);
  //   setCoin(coinValue);
  // }

  const calcCoinValue = (pesoValue) => {
    return (pesoValue / parseFloat(informal_USD.compra)).toFixed(2);
  }
  const calcPesoValue = (coinValue) => {
    return (coinValue * parseFloat(informal_USD.compra)).toFixed(2);
  }

  const handleFocusInput = (e) => {
    e.target.select()
  }
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//use a regex to add commas
  }

  return (
    <>
      <div className={styles.calculator}>
        <h2 className={styles.title}>Conversor</h2>
        <form className={styles.formCalculator}>
          <div className={styles.formCalculator__coin}>
            <input
              className={styles.formCalculator__coin__input}
              placeholder='0'
              onChange={handlerCoinChange}
              onFocus={handleFocusInput}
              value={coin}>

            </input>
            <span className={styles.formCalculator__coin__info}>
              <img src={unitedStateBrandImg} className={styles.brandImg} alt='United State brand icon'></img>
              <label className={styles.formCalculator__coin__info__name}>USD</label>
            </span>
          </div>

          {/* <button className={styles.formCalculator__exchange} onClick={changeValues}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>
          </button> */}

          <div className={styles.formCalculator__coin}>
            <input
              className={styles.formCalculator__coin__input}
              value={peso}
              onChange={handlerPesoChange}
              onFocus={handleFocusInput}
              placeholder='0'>
            </input>
            <span className={styles.formCalculator__coin__info}>
              <img src={argentinaBrandImg} className={styles.brandImg} alt="Argentina brand icon"></img>
              <label className={styles.formCalculator__coin__info__name}>ARS</label>
            </span>
          </div>
        </form>

        <div className={styles.currencyConverted}>
          <p className={`${styles.currencyConverted__values} ${styles.convert}`}>$ {numberWithCommas(coin)} USD</p>
          <p className={styles.currencyConverted__icon}>
            <FontAwesomeIcon icon={faEquals} ></FontAwesomeIcon>
          </p>
          <p className={`${styles.currencyConverted__values} ${styles.converted}`}>$ {numberWithCommas(peso)} ARS</p>
        </div>
      </div>
    </>
  )
}
export default ExchangeAppCalculator