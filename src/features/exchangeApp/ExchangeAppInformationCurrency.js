import styles from './ExchangeAppInformationCurrency.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ExchangeAppInformationCurrency = ({ currencyData }) => {

    const { name, values: currencyValues, historic } = currencyData;
    let fecha = currencyValues.fecha.slice(0, 10);
    let variation = currencyValues["class-variacion"];
    return (
        <div className={styles.currencyInformation}>

            <h3 className={styles.currencyInformation__name}>{name}</h3>
            <div className={styles.currencyInformation__data}>
                <div className={styles.currencyInformation__data__variation}>
                    <span>
                        <FontAwesomeIcon 
                            icon={variation === "up" ? faArrowUp : faArrowDown}
                            className={variation==="up" ? styles.variationUp : styles.variationDown}
                            >    
                        </FontAwesomeIcon>
                        <p>{currencyValues.variacion}</p>
                    </span>
                    <p className={styles.description}>VARIACIÓN</p>
                </div>
                <div className={styles.currencyInformation__data__value}>
                    <p>{currencyValues.compra}</p>
                    <p className={styles.description}>COMPRA</p>
                </div>
                <div className={styles.currencyInformation__data__value}>
                    <p>{currencyValues.venta}</p>
                    <p className={styles.description}>VENTA</p>
                </div>
                <div className={styles.currencyInformation__data__date}>
                    <p> {fecha} </p>
                </div>
            </div>
            {
                historic &&
                <div className={styles.currencyInformation__historicData}>
                    <h4>HISTORICO</h4>
                    <div className={styles.currencyInformation__historicData__value}>
                        <p>{historic.valor_cierre_ant}</p>
                        <p className={styles.description}>CIERRE ANTERIOR</p>
                    </div>
                    <div className={styles.currencyInformation__historicData__value}>
                        <p>{historic.maximo}</p>
                        <p className={styles.description}>MAXIMO {historic.fecha_maximo}</p>
                    </div>
                </div>
            }

            <div className={styles.currencyInformation__graph}>

            </div>
            {/* <p className={styles.currencyValueData}>1 USD = <span className={styles.value}>{data.compra}</span> ARS</p>
                    <p className={styles.currencyValueDate}> {fecha} </p> */}
        </div>
    )
}
export default ExchangeAppInformationCurrency