import styles from './Information.module.css';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import CurrencyInformationItem from './CurrencyInformationItem';

const CurrencyInformation = ({ currencyData }) => {
    const [showInformation, setShowInformation] = useState(false);
    const [showDisappearAnimation, setShowDisappearAnimation] = useState(false);

    const { name, values } = currencyData;
    let currencyName = '';
    if (name === 'DOLAR OFICIAL') currencyName = "oficialUSD"
    if (name === 'DOLAR INFORMAL') currencyName = "informalUSD"
    if (name === 'DOLAR MEP') currencyName = "mepUSD"
    if (name === 'EURO') currencyName = "euro"


    const handleShowInformationClick = (e) => {
        setShowInformation(true);
    }

    const handleCloseInformationClick = () => {
        setShowDisappearAnimation(true);
        setTimeout(() => {
            setShowInformation(false)
            setShowDisappearAnimation(false)
        }, 300);

    }

    return (
        <>
            <div className={styles.currencyInformation}>
                <div className={styles.currencyTitle}>
                    <button
                        className={`${styles.btnCurrencyShowInformation} ${showInformation && styles.border_bottom}`}
                        onClick={showInformation ? handleCloseInformationClick : handleShowInformationClick}
                        id={name}>
                        {name}
                        <FontAwesomeIcon icon={showInformation ? faChevronUp : faChevronDown} className={`${styles.arrowIcon} ${styles.arrowUpAnimation}`} />
                    </button>
                </div>
                {showInformation &&
                    <div className={`${styles.currencyInformationContainer}  ${!showDisappearAnimation && styles.appear} ${showDisappearAnimation && styles.disappear}`} >
                        <CurrencyInformationItem currencyName={currencyName} currencyValues={values} />
                    </div>
                }
            </div>
        </>

    )
}
export default CurrencyInformation