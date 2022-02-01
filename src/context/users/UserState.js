import { useReducer } from 'react'
import axios from 'axios'
import UserContext from './userContext'
import userReducer from './userReducer'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_DRIVER_SUCCESS,
    REGISTER_DRIVER_FAIL,
    LOAD_USER,
    LOGOUT
} from '../types'


const UserState = props => {
    const initialState = {
        user: null,
        isDriver: false,
        hasRegistered: false,
        token: null,
        isAuth: null,
        alert: null
    }

    const [state, dispatch] = useReducer(userReducer, initialState)

    const registerUser = async (user) => {
        const { email, password, carModel, carPlate, carColor } = user

        try {
            const config = { headers: { 'content-type': 'application/json' } }

            //Send response to database with volunteer's firstname, lastname, and email 
            const res = await axios.post('/api/users/register', { email, password, carModel, carPlate, carColor }, config)

            //If no errors, set volunteer variable to response
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            loadUser(res.data)

        } catch (err) {
            console.log(err.msg)
        }
    }

    const registerDriver = async (info, user) => {
        try {
            const { carModel, carPlate, carColor } = info
            const config = { headers: { 'content-type': 'application/json' } }

            // //Send response to database with volunteer's firstname, lastname, and email 
            const res = await axios.put(`/api/users/${user}`, { carModel, carPlate, carColor }, config)

            // //If no errors, set volunteer variable to response
            dispatch({
                type: REGISTER_DRIVER_SUCCESS,
                payload: res.data
            })

        } catch (err) {
            console.log(err.msg)
        }
    }

    const loginUser = async (user) => {
        try {

            const { email, password } = user
            const config = { headers: { 'content-type': 'application/json' } }
            const res = await axios.post('/api/users/login', { email, password }, config)


            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

            loadUser(res.data)

        } catch (err) {
            console.log(err.msg)
        }
    }

    const loadUser = async (user) => {
        try {
            dispatch({
                type: LOAD_USER,
                payload: user
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const logoutUser = async () => {
        dispatch({ type: LOGOUT })
    }

    const getUser = async(user) => {
        try {
            if (user === "") return
        const res = await axios.get(`/api/users/${user}`)
        return res.data
        } catch (err) {
            console.log(err.message)
        }
    }


    return (
        <UserContext.Provider
            value={{
                user: state.user,
                isDriver: state.isDriver,
                hasRegistered: state.hasRegistered,
                token: state.token,
                isAuth: state.isAuth,
                registerUser,
                registerDriver,
                loginUser,
                loadUser,
                logoutUser,
                getUser
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState