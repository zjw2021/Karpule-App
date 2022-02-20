import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    STRIPE_FINALIZE,
    STRIPE_SET_CODE_STATE,
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
        case STRIPE_FINALIZE:
            return {
                ...state,
                stripeStatus: action.payload,
            }
        case STRIPE_SET_CODE_STATE:
            return {
                ...state,
                stripeCode: action.payload.code,
                stripeState: action.payload.state,
            }
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
