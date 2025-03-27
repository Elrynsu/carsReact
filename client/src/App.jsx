import { Routes, Route } from 'react-router';

import { UserContext } from './contexts/UserContext';
import { useState } from 'react';

import CarList from './components/car-list/CarList';
import Register from './components/auth/Register';
import CarCreate from './components/car-create/CarCreate';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Profile from './components/auth/Profile';
import CarDetails from './components/car-details/carDetails';

import './App.css';

function App() {
    const [authData, setAuthData] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {_id: '', email: '', username: '', accessToken: ''};
    });

    const userLoginHandler = (userData) => {
        setAuthData(userData);
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const userLogoutHandler = () => {
        setAuthData({_id: '', email: '', username: '', accessToken: ''});
        localStorage.removeItem('user');
    }

  return (
    <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
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
        <Route path='/auth/logout' element={<Logout />} />
    </Routes>

    </div>
    <Footer />
    </UserContext.Provider>
  )
}

export default App
