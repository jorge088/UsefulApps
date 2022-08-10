import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer__container}>
          <h3 className={styles.footer__container__title}>Seguime en </h3>
          <div className={styles.footer__container__icons}>
            <a className={styles.footer__container__icons__a} href='https://www.instagram.com/jorgem_088/?hl=es-la' target={'_blank'} rel="noreferrer"  >
              <FontAwesomeIcon className={styles.icon} icon={faInstagram} ></FontAwesomeIcon>
            </a>
            <a className={styles.footer__container__icons__a} href='https://github.com/jorge088' target={'_blank'} rel="noreferrer" >
              <FontAwesomeIcon className={styles.icon} icon={faGithub}></FontAwesomeIcon>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer