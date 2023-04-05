import styles from './ExchangeAppInformation.module.css';
import ExchangeAppInformationCurrency from './ExchangeAppInformationCurrency';

const ExchangeAppInformation = ({ data }) => {
    const currencys = Object.values(data);//save data propertys in an array
    return (
        <>
            <div className={styles.informationContainer}>
                <h2 className={styles.title}>Cotizaciones</h2>
                {
                    currencys.map(currency =>
                        <ExchangeAppInformationCurrency currencyData={currency} key={currency.name} />
                    )
                }



            </div>

        </>
    )
}
export default ExchangeAppInformation