import styles from './App.module.css';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getDarkMode } from './features/darkMode/darkModeSlice';

import Home from './Components/Home/Home';
import NavBar from './Components/Shared/NavBar';
import WeatherApp from './features/weatherApp/WeatherApp';
import ExchangeApp from './features/exchangeApp/ExchangeApp';
import Contact from './Components/Contact/Contact';
import PomodoroApp from './features/pomodoroApp/PomodoroApp';

function App() {
  const styleMode = useSelector(getDarkMode);
  const appStyles = `${styles.app} ${styleMode ? styles.dark : ''}`;

  return (
    <>
      <HelmetProvider>
        <BrowserRouter>

          <div className={appStyles}>
            <NavBar />
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/clima'
                element={<WeatherApp />}
              />
              <Route
                path='/conversor'
                element={<ExchangeApp />}
              />
              <Route
                path='/contacto'
                element={<Contact />}
              />
              <Route
                path='/pomodoro'
                element={<PomodoroApp />}
              />
            </Routes>
          </div>

        </BrowserRouter>
      </HelmetProvider>

    </>
  );
}

export default App;
