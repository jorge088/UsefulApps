import styles from './Information.module.css'
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getInformationStatus, fetchCurrencyInformation, getCurrenciesInformation } from './exchangeSlice';
import { getDarkMode } from '../darkMode/darkModeSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import SpinnerLoading from '../../Components/Shared/SpinnerLoading';


import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CurrencyInformationItem = ({ currencyName, currencyValues }) => {
    const informationStatus = useSelector(getInformationStatus)
    const currenciesInformation = useSelector(getCurrenciesInformation)
    const status = informationStatus[currencyName];
    const isDarkMode = useSelector(getDarkMode)
    const dispatch = useDispatch();

    let content = <p></p>;

    if (status === 'idle') {
        content = <SpinnerLoading />
    }
    if (status === 'succeded') {
        const currencyInformation = currenciesInformation[currencyName];
        const { historicData, weeklyData } = currencyInformation;

        let fecha = currencyValues.fecha.slice(0, 10);
        let variation = currencyValues["class-variacion"];

        let dataChart = weeklyData.map(item => parseInt(item[1])).slice(1);
        let dateLabels = weeklyData.map(item => item[0]).slice(1);

        const data = {
            labels: dateLabels,
            datasets: [
                {
                    label: '',
                    data: dataChart,
                    borderColor: '#0c64b1',
                    backgroundColor: '#0c64b1'
                }

            ]
        }

        const options = {
            interactions: {
                intersect: false
            },
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        color: `${isDarkMode ? '#fff' : '#333333'}`,
                        padding: 0,
                        font: {
                            size: 12.5,
                            family: 'Lexend',
                            weight: 'normal'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: `${isDarkMode ? '#fff' : '#333333'}`,
                        padding: 0,
                        font: {
                            size: 12.5,
                            family: 'Lexend',
                            weight: 'normal'


                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'RESUMEN SEMANAL',
                    color: `${isDarkMode ? '#fff' : '#333333'}`,
                    font: {
                        size: 14,
                        family: 'Lexend',
                        weight: 'normal'
                    }

                },
            },
        }

        content =
            <>
                <div className={styles.currencyInformation__data}>
                    <div className={styles.currencyInformation__data__variation}>
                        <span>
                            <FontAwesomeIcon
                                icon={variation === "up" ? faArrowUp : faArrowDown}
                                className={variation === "up" ? styles.variationUp : styles.variationDown}
                            >
                            </FontAwesomeIcon>
                            <p>{currencyValues.variacion}</p>
                        </span>
                        <p className={styles.description}>VARIACIÓN</p>
                    </div>
                    <div className={styles.currencyInformation__data__value}>
                        <p>{currencyValues.compra}</p>
                        <p className={styles.description}>COMPRA</p>
                    </div>
                    <div className={styles.currencyInformation__data__value}>
                        <p>{currencyValues.venta}</p>
                        <p className={styles.description}>VENTA</p>
                    </div>
                    <div className={styles.currencyInformation__data__date}>
                        <p>  {fecha} </p>
                    </div>
                </div>
                {historicData &&
                    <div className={styles.currencyInformation__historicData}>
                        <h4>HISTORICO</h4>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>{historicData.valor_cierre_ant}</p>
                            <p className={styles.description}>CIERRE ANTERIOR</p>
                        </div>
                        <div className={styles.currencyInformation__historicData__value}>
                            <p>{historicData.maximo}</p>
                            <p className={styles.description}>MAXIMO {historicData.fecha_maximo}</p>
                        </div>
                    </div>
                }


                <div className={styles.currencyInformation__graph}>
                    <Line options={options} data={data} height='130px' width={'100%'} />
                </div>
            </>
    }
    if (status === 'failed') {
        content = <p>Falló</p>
    }

    useEffect(() => {
        if (status === 'succeded') {
            return;
        }
        dispatch(fetchCurrencyInformation(currencyName))
    }, [dispatch, currencyName, status])

    return (
        <>
            {content}
        </>
    )
}
export default CurrencyInformationItem