import styles from './ExchangeAppInformationCurrency.module.css';

import { useSelector } from 'react-redux';
import { getDarkMode } from '../darkMode/darkModeSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

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



const ExchangeAppInformationCurrency = ({ currencyData }) => {

    const isDarkMode = useSelector(getDarkMode);
    const { name, values: currencyValues, historic, weekly } = currencyData;
    let fecha = currencyValues.fecha.slice(0, 10);
    let variation = currencyValues["class-variacion"];

    let dataChart = weekly.map(item => parseInt(item[1])).slice(1);
    let dateLabels = weekly.map(item => item[0]).slice(1);

    // console.log('DataChart', dataChart);
    // console.log('DateLabels', dateLabels);

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

    return (
        <div className={styles.currencyInformation}>
            <h3 className={styles.currencyInformation__name}>{name}</h3>
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
                    <p> {fecha} </p>
                </div>
            </div>
            {
                historic &&
                <div className={styles.currencyInformation__historicData}>
                    <h4>HISTORICO</h4>
                    <div className={styles.currencyInformation__historicData__value}>
                        <p>{historic.valor_cierre_ant}</p>
                        <p className={styles.description}>CIERRE ANTERIOR</p>
                    </div>
                    <div className={styles.currencyInformation__historicData__value}>
                        <p>{historic.maximo}</p>
                        <p className={styles.description}>MAXIMO {historic.fecha_maximo}</p>
                    </div>
                </div>
            }

            <div className={styles.currencyInformation__graph}>
                <Line options={options} data={data} height='130px' width={'100%'} />
            </div>
        </div>
    )
}
export default ExchangeAppInformationCurrency