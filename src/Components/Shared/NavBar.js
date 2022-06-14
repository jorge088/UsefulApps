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
            <li><Link to={'/'} className={styles.nav__categorys__link}>Home</Link></li>
            <li><Link to={'/exchange'} className={styles.nav__categorys__link}>Exchange</Link></li>
            <li><Link to={'/weather'} className={styles.nav__categorys__link}>Clima</Link></li>
            <li><Link to={'/'} className={styles.nav__categorys__link}>Sugerencias</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
export default NavBar