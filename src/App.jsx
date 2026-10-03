
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';

function App() {
  return (
    <div class="app-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/city" element={<CityPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
