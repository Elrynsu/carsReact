import { Routes, Route } from 'react-router';

import CarList from './components/car-list/CarList';
import Register from './components/auth/Register';
import CarCreate from './components/car-create/CarCreate';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Header from './components/header/Header';

import './App.css';
import Footer from './components/footer/Footer';
import Profile from './components/auth/Profile';
import CarDetails from './components/car-details/carDetails';

function App() {

  return (
    <>
    <Header />
    <div  className="container page-overlay my-5">

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<CarList />} />
        <Route path='/cars/create' element={<CarCreate />} />
        <Route path='/cars/:carId/details' element={<CarDetails />} />
        <Route path='/auth/profile' element={<Profile />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
    </Routes>

    </div>
    <Footer />
    </>
  )
}

export default App
