import styles from './HomeCard.module.css';
const HomeCard = () => {
    return (
        <>
            <div className={styles.card}>
                <h3 className={styles.card__title}>Wheater App</h3>
                <p className={styles.card__description}>Mira como está el clima en tu ciudad</p>
            </div>
        </>
    )
}
export default HomeCard