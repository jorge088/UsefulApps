import styles from './Information.module.css';
import CurrencyInformation from './CurrencyInformation';

const InformationContainer = ({ currenciesData }) => {
    return (
        <>
            <div className={styles.informationContainer}>
                <h2 className={styles.title}>Cotizaciones</h2>
                {currenciesData.map((currency, key) =>
                    <CurrencyInformation currencyData={currency} key={key} />
                )}
            </div>

        </>
    )
}
export default InformationContainer