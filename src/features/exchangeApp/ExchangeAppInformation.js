import styles from './ExchangeAppInformation.module.css';

const ExchangeAppInformation = ({ data }) => {
    let fecha = data.fecha.slice(0, 10);
    return (
        <>
            <div className={styles.information}>
                <h2 className={styles.informationTitle}>Convierte USD a ARS </h2>

                <div className={styles.currencyValueContainer}>
                    <p className={styles.currencyValueData}>1 USD = <span className={styles.value}>{data.compra}</span> ARS</p>
                    <p className={styles.currencyValueDate}> {fecha} </p>

                </div>
            </div>

        </>
    )
}
export default ExchangeAppInformation