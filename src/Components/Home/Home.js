import styles from './Home.module.css';
import HomeCard from './HomeCard';
import weatherImg from './../../Assets/weatherLogo.png';
import exchangeImg from './../../Assets/exchangeLogo.png';
import pomodoroImg from './../../Assets/pomodoroLogo.png'
import PomodoroCheck from '../../features/pomodoroApp/PomodoroCheck';

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
      description: 'Buscá el clima en tu ciudad',
      img: weatherImg
    },
    {
      name: 'Pomodoro',
      route: 'pomodoro',
      description: 'Administra tu tiempo',
      img: pomodoroImg
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
      <PomodoroCheck/>
    </>
  )
}
export default Home