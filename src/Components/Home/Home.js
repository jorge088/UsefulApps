import styles from './Home.module.css';
import HomeCard from './HomeCard';
import weatherImg from './../../Assets/weatherLogo.png';
import exchangeImg from './../../Assets/exchangeLogo.png';


const Home = () => {
  const apps = [
    
    {
      name: 'Exchange',
      route: 'exchange',
      description: 'Convertí USD a pesos AR',
      img: exchangeImg
    },
    {
      name: 'Weather',
      route: 'weather',
      description: 'Mira como está el clima en tu ciudad',
      img: weatherImg
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