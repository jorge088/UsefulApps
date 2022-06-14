import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home';
import NavBar from './Components/Shared/NavBar';
import Footer from './Components/Shared/Footer';
import WeatherApp from './Components/WeatherApp/WeatherApp';
import ExchangeApp from './Components/ExchangeApp/ExchangeApp';
import ExchangeContextProvider from './Components/Context/ExchangeContext';

function App() {
  return (
    <>
      <ExchangeContextProvider>
        <BrowserRouter>
          <div className={styles.app}>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/weather' element={<WeatherApp />} />
              <Route path='/exchange' element={<ExchangeApp />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </ExchangeContextProvider>
    </>
  );
}

export default App;
