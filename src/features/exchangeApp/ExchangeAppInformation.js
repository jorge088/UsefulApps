import styles from './ExchangeAppInformation.module.css';

const ExchangeAppInformation = ({ data }) => {
    let fecha = data.fecha.slice(0, 10);
    return (
        <>
            <div className={styles.informationContainer}>
                <h2 className={styles.title}>Cotizaciones</h2>
                <div className={styles.currencyInformation}>
                    <h3 className={styles.currencyInformation__name}>DOLAR INFORMAL</h3>
                    <div className={styles.currencyInformation__data}>
                        <div className={styles.currencyInformation__data__variation}>
                            <span>
                                <p>p</p>
                                <p>-0,54%</p>
                            </span>
                            <p className={styles.description}>VARIACIÓN</p>
                        </div>
                        <div className={styles.currencyInformation__data__value}>
                            <p>381</p>
                            <p className={styles.description}>COMPRA</p>
                        </div>
                        <div className={styles.currencyInformation__data__value}>
                            <p>381</p>
                            <p className={styles.description}>VENTA</p>
                        </div>
                        <div className={styles.currencyInformation__data__date}>
                            <p> 23/03/2023 </p>
                        </div>
                    </div>
                    <div className={styles.currencyInformation__historicData}>
                        <h4>HISTORICO</h4>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>381</p>
                            <p className={styles.description}>CIERRE ANTERIOR</p>
                        </div>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>381</p>
                            <p className={styles.description}>MAXIMO 23/03/2023</p>
                        </div>
                    </div>
                    <div className={styles.currencyInformation__graph}>

                    </div>
                    {/* <p className={styles.currencyValueData}>1 USD = <span className={styles.value}>{data.compra}</span> ARS</p>
                    <p className={styles.currencyValueDate}> {fecha} </p> */}
                </div>
                <div className={styles.currencyInformation}>
                    <h3 className={styles.currencyInformation__name}>DOLAR INFORMAL</h3>
                    <div className={styles.currencyInformation__data}>
                        <div className={styles.currencyInformation__data__variation}>
                            <span>
                                <p>p</p>
                                <p>-0,54%</p>
                            </span>
                            <p className={styles.description}>VARIACIÓN</p>
                        </div>
                        <div className={styles.currencyInformation__data__value}>
                            <p>381</p>
                            <p className={styles.description}>COMPRA</p>
                        </div>
                        <div className={styles.currencyInformation__data__value}>
                            <p>381</p>
                            <p className={styles.description}>VENTA</p>
                        </div>
                        <div className={styles.currencyInformation__data__date}>
                            <p> 23/03/2023 </p>
                        </div>
                    </div>
                    <div className={styles.currencyInformation__historicData}>
                        <h4>HISTORICO</h4>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>381</p>
                            <p className={styles.description}>CIERRE ANTERIOR</p>
                        </div>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>381</p>
                            <p className={styles.description}>MAXIMO 23/03/2023</p>
                        </div>
                    </div>
                    <div className={styles.currencyInformation__graph}>

                    </div>
                    {/* <p className={styles.currencyValueData}>1 USD = <span className={styles.value}>{data.compra}</span> ARS</p>
                    <p className={styles.currencyValueDate}> {fecha} </p> */}
                </div>
                <div className={styles.currencyInformation}>
                    <h3 className={styles.currencyInformation__name}>DOLAR INFORMAL</h3>
                    <div className={styles.currencyInformation__data}>
                        <div className={styles.currencyInformation__data__variation}>
                            <span>
                                <p>p</p>
                                <p>-0,54%</p>
                            </span>
                            <p className={styles.description}>VARIACIÓN</p>
                        </div>
                        <div className={styles.currencyInformation__data__value}>
                            <p>381</p>
                            <p className={styles.description}>COMPRA</p>
                        </div>
                        <div className={styles.currencyInformation__data__value}>
                            <p>381</p>
                            <p className={styles.description}>VENTA</p>
                        </div>
                        <div className={styles.currencyInformation__data__date}>
                            <p> 23/03/2023 </p>
                        </div>
                    </div>
                    <div className={styles.currencyInformation__historicData}>
                        <h4>HISTORICO</h4>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>381</p>
                            <p className={styles.description}>CIERRE ANTERIOR</p>
                        </div>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>381</p>
                            <p className={styles.description}>MAXIMO 23/03/2023</p>
                        </div>
                    </div>
                    <div className={styles.currencyInformation__graph}>

                    </div>
                    {/* <p className={styles.currencyValueData}>1 USD = <span className={styles.value}>{data.compra}</span> ARS</p>
                    <p className={styles.currencyValueDate}> {fecha} </p> */}
                </div>
            </div>

        </>
    )
}
export default ExchangeAppInformation