import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import UserContext from '../context/users/userContext'
import "../styles/components.css"

const Register = () => {
    const userContext = useContext(UserContext)
    const { registerUser, isAuth } = userContext

    const [user, setUser] = useState({
        email: "",
        password: "",
        profile: ""
    })
    const { email } = user

    // Check if email is a babson email
    const emailAddress = email.substring(email.length - 10, email.length)

    const clearForm = () => {
        setUser({
            email: "",
            password: "",
            profile: "",
            carModel: "",
            carPlate: "",
            carColor: ""
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(emailAddress !== 'babson.edu') return
        registerUser(user)
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
                        <p className="bodyMd">Create new account</p>
                    </div>
                    <input name="email" placeholder="Email" className="formInput" onChange={onChange} />
                    <input name="password" type="password" placeholder="Password" className="formInput" onChange={onChange} />
                    <p className="bodyMd w-bold" style={{marginTop: "2rem"}}>Drive with Karpule (optional)</p>
                    <input name="carModel" placeholder="Car model" className="formInput" onChange={onChange} />
                    <input name="carColor" placeholder="Car color" className="formInput" onChange={onChange} />
                    <input name="carPlate" placeholder="License plate" className="formInput" onChange={onChange} />
                    <button type="submit" className="formButton bodyMd">Register</button>
                </form>
                <Link to="/login" className="link bodyMd">Already have an account?</Link>
            </div>
            {isAuth && <Navigate to='/' />}
        </div>
    )
}

export default Register
