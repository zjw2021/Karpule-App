import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import UserContext from '../../context/users/userContext'
import Footer from '../Footer'

const Layout = (props) => {
    const userContext = useContext(UserContext)
    const { isAuth, isDriver } = userContext
    return (
        <div style={{ "minHeight": "100%" }}>
            <div className="container">
                {props.children}
            </div>
            {isDriver ? <Footer /> : null }
            {!isAuth && <Navigate to='/login' />}
        </div>
    )
}
export default Layout