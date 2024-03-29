import { Helmet } from 'react-helmet-async';
import styles from './Home.module.css';
import HomeCard from './HomeCard';
import weatherImg from './../../Assets/weatherLogo.png';
import exchangeImg from './../../Assets/exchangeLogo.png';
import pomodoroImg from './../../Assets/pomodoroLogo.png';
import usefulAppsIcon from "./../../Assets/usefulAppsIcon.ico"

const Home = () => {
  const apps = [

    {
      name: 'Conversor',
      route: 'conversor',
      description: 'Convertí USD a pesos AR',
      img: exchangeImg
    },
    {
      name: 'Clima',
      route: 'clima',
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
      <Helmet>
        <title>Useful Apps</title>
        <link rel="icon" type="image/png" href={usefulAppsIcon} sizes="48x48" ></link>

      </Helmet>
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