import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import UserContext from '../context/users/userContext'
import "../styles/components.css"

const Login = () => {
    const userContext = useContext(UserContext)
    const { loginUser, isAuth } = userContext

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const clearForm = () => {
        setUser({
            email: "",
            password: ""
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        loginUser(user)
        clearForm()
    }

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <div className="logoContainer">
                        <p className="titleXl logo">Karpule</p>
                        <p className="bodyMd">A ride sharing platform</p>
                    </div>
                    <input name="email" placeholder="Email" className="formInput" onChange={onChange} />
                    <input name="password" type="password" placeholder="Password" className="formInput" onChange={onChange} />
                    <button type="submit" className="formButton bodyMd">Login</button>
                </form>
                <Link to="/register" className="link bodyMd">Don't have an account?</Link>
            </div>
            {isAuth && <Navigate to='/' />}
        </div>
    )
}

export default Login
