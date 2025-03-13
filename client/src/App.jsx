import { Routes, Route } from 'react-router';

import CarList from './components/car-list/CarList';
import Register from './components/auth/Register';
import CarCreate from './components/car-create/CarCreate';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Header from './components/header/Header';

import './App.css';
import Footer from './components/footer/Footer';

function App() {

  return (
    <div className='app-container'>
    <Header />

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<CarList />} />
        <Route path='/cars/create' element={<CarCreate />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
    </Routes>

    <Footer />
    </div>
  )
}

export default App
