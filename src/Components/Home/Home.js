import styles from './Home.module.css';
import HomeCard from './HomeCard';
const Home = () => {
  const apps = [
    {
      name: 'Weather',
      route: 'weather',
      description: 'Mira como está el clima en tu ciudad',
      img: 'https://i.ibb.co/DthMn4H/weather-App.png'
    },
    {
      name: 'Exchange',
      route: 'exchange',
      description: 'Convertí USD a pesos AR',
      img: 'https://i.ibb.co/XC6nNpW/exchange-App.png'
    }
  ]
  return (
    <>
      <div className={styles.homeContainer}>
        {/* <main>
          <h1>Bienvenido</h1>
        </main> */}
        <div className={styles.homeCardsContainer}>
          {apps.map(item => <HomeCard item={item} key={item.name}></HomeCard>)

          }
        </div>


      </div>
    </>
  )
}
export default Home