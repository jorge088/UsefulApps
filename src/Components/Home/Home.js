import styles from './Home.module.css';
import HomeCard from './HomeCard';
const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <main>
          <h1>Bienvenido</h1>
        </main>
        <div className={styles.homeCardsContainer}>
          <HomeCard />
          <HomeCard />
        </div>


      </div>
    </>
  )
}
export default Home