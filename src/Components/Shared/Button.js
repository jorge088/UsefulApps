import styles from './Button.module.css';
const Button = ( {content , type, _callback} ) => {
  return (
    <>
        <button
            className={styles.button}
            onClick={_callback}
        >{content}</button>
    </>
  )
}
export default Button