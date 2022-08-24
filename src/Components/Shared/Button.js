import styles from './Button.module.css';
const Button = ( {content , type, _callback,disabled} ) => {
  return (
    <>
        <button
            className={`${styles.button} ${disabled ? styles.disabled : ''}`}
            onClick={_callback}
            disabled={disabled}
        >{content}</button>
    </>
  )
}
export default Button