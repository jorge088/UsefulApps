import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home';
import NavBar from './Components/Shared/NavBar';
import Footer from './Components/Shared/Footer';
import WeatherApp from './features/weatherApp/WeatherApp';
import ExchangeApp from './Components/ExchangeApp/ExchangeApp';
import Contact from './Components/Contact/Contact';
import PomodoroApp from './Components/PomodoroApp/PomodoroApp';
import PomodoroContextProvider from './Components/Context/PomodoroContext';

function App() {
  return (
    <>
      <BrowserRouter>

        <div className={styles.app}>
          <NavBar />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/weather'
              element={ <WeatherApp/> }
            />
            <Route
              path='/exchange'
              element={ <ExchangeApp />}
            />
            <Route
              path='/contact'
              element={<Contact />}
            />
            <Route
              path='/pomodoro'
              element={
                <PomodoroContextProvider>
                  <PomodoroApp />
                </PomodoroContextProvider>
              }
            />
          </Routes>
          <Footer />
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
