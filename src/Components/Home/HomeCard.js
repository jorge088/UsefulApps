import styles from './HomeCard.module.css';
import { Link } from 'react-router-dom'; 
const HomeCard = ({ item }) => {

    return (
        <>
            <Link to={`/${item.route}`} className={styles.card} >
                <img className={styles.card__img} src={item.img} alt={item.name}/>
                <div className={styles.card__imformation}>
                    <h3 className={styles.card__title}>{item.name}</h3>
                    <p className={styles.card__description}>{item.description}</p>
                </div>

            </Link>
        </>
    )
}
export default HomeCard