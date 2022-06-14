import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div>
            <Link to={'/'} className={styles.nav__logo} >Useful Apps</Link>
          </div>
          <ul className={styles.nav__categorys}>
            <li><Link to={'/'} className={styles.nav__categorys__link}>HOME</Link></li>
            <li><Link to={'/exchange'} className={styles.nav__categorys__link}>EXCHANGE</Link></li>
            <li><Link to={'/weather'} className={styles.nav__categorys__link}>CLIMA</Link></li>
            <li><Link to={'/'} className={styles.nav__categorys__link}>SUGERENCIAS</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
export default NavBar