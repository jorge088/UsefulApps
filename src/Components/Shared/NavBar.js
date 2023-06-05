import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { toggleStyleMode, getDarkMode } from '../../features/darkMode/darkModeSlice';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector(getDarkMode);

  const handlerShowMenuBtn = () => {
    setShowMenu(!showMenu);
  }
  const handlerClickLink = () => {
    setShowMenu(false);
  }

  const handlerChangeMode = () => {
    dispatch(toggleStyleMode());
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>

          <ul className={styles.nav__categorys}>
            <li><Link to={'/'} className={styles.nav__categorys__link}>Home</Link></li>
            <li><Link to={'/conversor'} className={styles.nav__categorys__link}>Conversor</Link></li>
            <li><Link to={'/clima'} className={styles.nav__categorys__link}>Clima</Link></li>
            <li><Link to={'/pomodoro'} className={styles.nav__categorys__link}>Pomodoro</Link></li>
            <li><Link to={'/contacto'} className={styles.nav__categorys__link}>Contacto</Link></li>
          </ul>

          <button onClick={handlerShowMenuBtn} className={styles.nav__btnShowMenu}>
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </button>

          {showMenu &&
            <ul className={styles.nav__categorysResponsive}>
              <li><Link onClick={handlerClickLink} to={'/'} className={styles.nav__categorys__linkResponsive}>Home</Link></li>
              <li><Link onClick={handlerClickLink} to={'/conversor'} className={styles.nav__categorys__linkResponsive}>Conversor</Link></li>
              <li><Link onClick={handlerClickLink} to={'/clima'} className={styles.nav__categorys__linkResponsive}>Clima</Link></li>
              <li><Link onClick={handlerClickLink} to={'/pomodoro'} className={styles.nav__categorys__linkResponsive}>Pomodoro</Link></li>
              <li><Link onClick={handlerClickLink} to={'/contacto'} className={styles.nav__categorys__linkResponsive}>Contacto</Link></li>
            </ul>
          }
          <button onClick={handlerChangeMode} className={styles.btnChangeStyleMode}>
            <FontAwesomeIcon icon={darkMode? faSun : faMoon} />
          </button>

        </nav>
      </header>
    </>
  )
}
export default NavBar