import styles from './Calculator.module.css';

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals } from '@fortawesome/free-solid-svg-icons';


const ExchangeAppCalculator = ({ currenciesData }) => {

  const currenciesValues = currenciesData.map(currency => (
    {
      name: currency.name,
      compra: currency.values.compra
    }));

  currenciesValues.forEach(item => {
    if (item.name === 'DOLAR OFICIAL') item.name = 'USD OFICIAL'
    if (item.name === 'DOLAR INFORMAL') item.name = 'USD BLUE'
    if (item.name === 'DOLAR MEP') item.name = 'USD MEP'
    if (item.name === 'EURO') item.name = 'EUR'
  });

  const [calculatorData, setCalculatorData] = useState({
    coin: '',
    peso: ''
  })
  const [currencySelected, setCurrencySelected] = useState(currenciesValues.find(currency => currency.name === 'USD BLUE'));
  const re = /^[0-9\b]+$/;

  useEffect(() => {
    calcCurrencyChange()
    // eslint-disable-next-line
  }, [currencySelected])


  const calcCurrencyChange = () => {
    if (calculatorData.coin !== '') {
      let pesoValue = calcPesoValue(calculatorData.coin);
      setCalculatorData({
        ...calculatorData,
        peso: parseFloat(pesoValue)
      })
    }
  }
  const calcCoinValue = (pesoValue) => {
    return (pesoValue / parseFloat(currencySelected.compra)).toFixed(2);
  }
  const calcPesoValue = (coinValue) => {
    return (coinValue * parseFloat(currencySelected.compra)).toFixed(2);
  }

  const handleFocusInput = (e) => {
    e.target.select()
  }
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//use a regex to add commas
  }

  const handleChangeInputValue = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    if (value === '') {
      setCalculatorData({ coin: '', peso: '' })
      return
    }

    if (value === '' || re.test(value)) {
      if (inputName === 'coin') {
        let pesoValue = calcPesoValue(parseFloat(value));
        setCalculatorData({
          coin: parseFloat(value),
          peso: pesoValue
        })
      }
      if (inputName === 'peso') {
        let coinValue = calcCoinValue(parseFloat(value));
        setCalculatorData({
          coin: coinValue,
          peso: value
        })
      }

    }

  }

  const handleChangeCurrencySelect = (event) => {
    const newCurrency = currenciesValues.find(currency => event.target.selectedOptions[0].label.includes(currency.name))
    setCurrencySelected(newCurrency)
    if (calculatorData.coin !== '') {
      let pesoValue = calcPesoValue(calculatorData.coin);
      setCalculatorData({
        ...calculatorData,
        peso: parseFloat(pesoValue)
      });
    }
  }


  return (
    <>
      <div className={styles.calculator}>
        <h2 className={styles.title}>Conversor</h2>
        <div className={styles.currencySelectedInformation}>1 {currencySelected.name} = {currencySelected.compra} ARS</div>
        <form className={styles.formCalculator}>
          <div className={styles.formCalculator__coin}>
            <input
              className={styles.formCalculator__coin__input}
              placeholder='0'
              onChange={handleChangeInputValue}
              onFocus={handleFocusInput}
              value={calculatorData.coin}
              name='coin'>

            </input>
            <span className={styles.formCalculator__coin__info}>
              <select value={currencySelected.compra} onChange={handleChangeCurrencySelect} className={styles.selectCurrency}>
                {currenciesValues.map(currency => (
                  <option key={currency.name} value={currency.compra} className={styles.optionsSelect}>
                    {`${currency.name.includes('USD') ? '🇺🇸' : '🇪🇺'} ${currency.name}`}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className={styles.formCalculator__coin}>
            <input
              className={styles.formCalculator__coin__input}
              value={calculatorData.peso}
              onChange={handleChangeInputValue}
              onFocus={handleFocusInput}
              placeholder='0'
              name='peso'>
            </input>
            <span className={styles.formCalculator__coin__info}>
              <label className={styles.formCalculator__coin__info__name}>🇦🇷 ARS</label>
            </span>
          </div>
        </form>
        {calculatorData.coin !== '' &&
          <div className={styles.currencyConverted}>
            <div className={`${styles.convertedContainer} ${styles.convert}`}>
              <p className={styles.currencyConverted__values}>$ {numberWithCommas(calculatorData.coin)} </p>
              <p className={styles.currencyName}>{currencySelected.name}</p>
            </div>
            <p className={styles.currencyConverted__icon}>
              <FontAwesomeIcon icon={faEquals} ></FontAwesomeIcon>
            </p>
            <div className={`${styles.convertedContainer} ${styles.converted}`}>
              <p className={`${styles.currencyConverted__values} `}>$ {numberWithCommas(calculatorData.peso)} </p>
              <p className={styles.currencyName}>ARS</p>
            </div>
          </div>
        }

      </div >
    </>
  )
}
export default ExchangeAppCalculator