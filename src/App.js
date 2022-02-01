import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserState from './context/users/UserState';
import RideState from './context/ride/RideState';

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register';

import HomePage from './pages/Home'
import DrivePage from './pages/Drive'

import UserContext from './context/users/userContext';

function BrowserRoutes() {
    const userContext = useContext(UserContext)
    const { isDriver } = userContext
    return <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />

        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/drive' element={isDriver ? <DrivePage /> : <Navigate to="/"/>} />

    </Routes>
}
function App() {
    return (
        <Router>
            <UserState>
                <RideState>
                    <BrowserRoutes />
                </RideState>
            </UserState>
        </Router>
    )
}

export default App