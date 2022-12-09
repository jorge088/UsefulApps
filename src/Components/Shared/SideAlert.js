
import { useEffect } from "react";
import styles from "./SideAlert.module.css";

const SideAlert = ({ text, type, _callback }) => {


    let sideAlertType;
    switch (type) {
        case "succed":
            sideAlertType = styles.succed;
            break;
        case 'error':
            sideAlertType = styles.error;
            break;
        default:
            sideAlertType = '';
            break;
    }

    let sideStyles = `${styles.sideAlertContainer} ${sideAlertType} `

    useEffect(() => {
        const disappearSideAlert = setTimeout(() => {
            _callback();
        }, 3000);

        return () => clearTimeout(disappearSideAlert); //unmount the component and clear the timeout
    }, [_callback]);

    const handleSideAlertClick = () => {
        _callback()
    }
    let content =
        <div className={sideStyles} onClick={handleSideAlertClick}>
            <p>{text}</p>
        </div>;

    return (
        content
    )
}
export default SideAlert