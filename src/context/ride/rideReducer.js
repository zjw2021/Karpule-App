import {
    SEARCH,
    CREATE_RIDE,
    EDIT_RIDE,
    DELETE_RIDE,
    JOIN_RIDE,
    LEAVE_RIDE,
    GET_RIDES,
    GET_RIDE
} from '../types'

const rideReducer = (state, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                search: state.rides.rides.filter(ride => ride.destination.toLowerCase().includes(action.payload.toLowerCase()))
            }
        case CREATE_RIDE:
        case EDIT_RIDE:
        case DELETE_RIDE:
            return {
                ...state,
                driverRide: action.payload
            }
        case JOIN_RIDE:
            return {
                ...state,
                riderRide: action.payload.ride,
                passengers: [...state.passengers, action.payload.passenger]
            }
        case LEAVE_RIDE:
            return {
                ...state,
                riderRide: null,
                // passengers: action.payload
            }
        case GET_RIDE:
            return {
                ...state,
                ride: action.payload,
            }
        case GET_RIDES:
            return {
                ...state,
                rides: action.payload
            }
        default:
            return state
    }
}

export default rideReducer