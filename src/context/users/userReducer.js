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

const userReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
            }
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                isDriver: action.payload.user.isDriver
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuth: false,
                user: null
            };
        case REGISTER_DRIVER_SUCCESS:
            return {
                ...state,
                hasRegistered: true,
            };
        default:
            return state
    }
}

export default userReducer