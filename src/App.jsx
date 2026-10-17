
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import CityDetails from './pages/CityDetails';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/city" element={<CityPage />}></Route>
        <Route path="/city/:city" element={<CityDetails />}></Route>
      </Routes>
    </div>
  )
}

export default App
