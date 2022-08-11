import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handlerShowMenuBtn = () => {
    setShowMenu(!showMenu);
  }
  const handlerClickLink = () =>{
    setShowMenu(false);
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          
          <ul className={styles.nav__categorys}>
            <li><Link to={'/'} className={styles.nav__categorys__link}>Home</Link></li>
            <li><Link to={'/exchange'} className={styles.nav__categorys__link}>Exchange</Link></li>
            <li><Link to={'/weather'} className={styles.nav__categorys__link}>Clima</Link></li>
            <li><Link to={'/contact'} className={styles.nav__categorys__link}>Contact</Link></li>
          </ul>

          <button onClick={handlerShowMenuBtn} className={styles.nav__btnShowMenu}>
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </button>

          {showMenu &&
            <ul className={styles.nav__categorysResponsive}>
              <li><Link onClick={handlerClickLink} to={'/'} className={styles.nav__categorys__linkResponsive}>Home</Link></li>
              <li><Link onClick={handlerClickLink} to={'/exchange'} className={styles.nav__categorys__linkResponsive}>Exchange</Link></li>
              <li><Link onClick={handlerClickLink} to={'/weather'} className={styles.nav__categorys__linkResponsive}>Clima</Link></li>
              <li><Link onClick={handlerClickLink} to={'/contact'} className={styles.nav__categorys__linkResponsive}>Sugerencias</Link></li>
            </ul>
          }

        </nav>
      </header>
    </>
  )
}
export default NavBar