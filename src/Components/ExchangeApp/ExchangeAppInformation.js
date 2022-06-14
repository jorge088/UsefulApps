import styles from './ExchangeAppInformation.module.css';

const ExchangeAppInformation = () => {
    return (
        <>
            <div className={styles.information}>
                <h2 className={styles.informationTitle}>CONVERSOR</h2>
                <p className={styles.informationDescription}>Dolar - Pesos AR</p>
            </div>
        </>
    )
}
export default ExchangeAppInformation