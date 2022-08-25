import styles from './Button.module.css';
const Button = ({ content, type, _callback, disabled }) => {

  const checkType = () => {
    switch (type) {
      case 'classic':
        return styles.classic;
      case 'close':
        return styles.close;
      case 'submit':
        return styles.submit;
      case 'transparent':
        return styles.transparent;
      default:
        return '';
    }
  }

  return (
    <>
      <button
        className={`${styles.button} ${disabled ? styles.disabled : ''} ${checkType()}`}
        onClick={_callback}
        disabled={disabled}
      >{content}</button>
    </>
  )
}
export default Button