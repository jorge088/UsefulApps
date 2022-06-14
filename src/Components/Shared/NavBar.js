import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div>
            <h2 className={styles.nav__logo}>Useful Apps</h2>
          </div>
          <ul className={styles.nav__categorys}>
            <li><a className={styles.nav__categorys__link}>EXCHANGE</a></li>
            <li><a className={styles.nav__categorys__link}>CLIMA</a></li>
            <li><a className={styles.nav__categorys__link}>SUGERENCIAS</a></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
export default NavBar