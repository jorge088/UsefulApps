import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppsContainer from './Components/AppsContainer';
import NavBar from './Components/Shared/NavBar';
import Footer from './Components/Shared/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className={styles.app}>
          <NavBar />
          <Routes>
            <Route path='/' element={<AppsContainer />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
