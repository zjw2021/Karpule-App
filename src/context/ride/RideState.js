import { useReducer } from 'react'
import axios from 'axios'
import RideContext from './rideContext'
import rideReducer from './rideReducer'
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


const RideState = props => {
    const initialState = {
        rides: null,
        search: null,
        driverRide: null,
        riderRide: null,
        ride: null,
        passengers: [],
        requested: [],
        awaitingPayment: [],
        isComplete: false,
    }

    const [state, dispatch] = useReducer(rideReducer, initialState)

    const searchRide = (ride) => {
        try {
            dispatch({
                type: SEARCH,
                payload: ride
            })
        } catch (err) {
            console.log(err.msg)
        }
    }

    const createRide = async (ride, user) => {
        try {
            const { destination, pickupLocation, pickupTime, seatLimit, seatFee } = ride
            const config = { headers: { 'content-type': 'application/json' } }
            const res = await axios.post(`/api/rides/create/${user.user._id}`, {
                destination,
                pickupLocation,
                pickupTime,
                seatLimit,
                seatFee
            }, config)

            dispatch({
                type: CREATE_RIDE,
                payload: res.data
            })

        } catch (err) {
            console.log(err.msg)
        }
    }

    const editRide = async (ride) => {
        try {
            const { destination, pickupLocation, pickupTime, seatLimit, seatFee } = ride
            const config = { headers: { 'content-type': 'application/json' } }
            const res = await axios.put(`/api/rides/edit/${ride._id}`, {
                destination,
                pickupLocation,
                pickupTime,
                seatLimit,
                seatFee
            }, config)

            dispatch({
                type: EDIT_RIDE,
                payload: res.data
            })

        } catch (err) {
            console.log(err.msg)
        }
    }

    const deleteRide = async (ride) => {
        try {
            await axios.delete(`/api/rides/delete/${ride}`)
            dispatch({
                type: DELETE_RIDE,
                payload: null
            })

        } catch (err) {
            console.log(err.msg)
        }
    }

    const requestRide = async (ride) => {
        try {
            const config = { headers: { 'content-type': 'application/json', "x-auth-token": localStorage.getItem("token") } };

            const res = await axios.post(`/api/rides/requestride/${ride}`, {}, config);
        } catch (err) {
            console.log(err.msg);
        }
    }

    const acceptRequest = async (ride, passenger) => {
        try {
            const config = { headers: { 'content-type': 'application/json', "x-auth-token": localStorage.getItem("token") } };

            await axios.post(`/api/rides/acceptrequest/${ride}`, {passenger}, config);
        } catch (err) {
            console.log(err.msg);
        }
    }

    const purchaseRide = async (ride) => {
        try {
            const config = { headers: { 'content-type': 'application/json', "x-auth-token": localStorage.getItem("token") } }

            const stripe = await axios.post("/api/stripe/purchaseride", {ride}, config);

            window.location.href = stripe.data.url;
        } catch (err) {
            console.log(err.msg);
        }
    }

    const completeRide = async (ride) => {
        try {
            const config = { headers: { 'content-type': 'application/json', "x-auth-token": localStorage.getItem("token") } };
            await axios.put(`/api/stripe/completeride/${ride}`, {}, config);
        } catch (err) {
            console.log(err.msg);
        }
    }

    const joinRide = async (ride, passenger) => {
        try {
            const config = { headers: { 'content-type': 'application/json', "x-auth-token": localStorage.getItem("token") } };
            await axios.put(`/api/rides/join/${ride}`, { rider: passenger.user._id }, config)

            const data = {
                ride,
                passenger
            }

            dispatch({
                type: JOIN_RIDE,
                payload: data
            })
        } catch (err) {
            console.log(err.msg)
        }
    }

    const leaveRide = async (ride, passenger) => {

        const config = { headers: { 'content-type': 'application/json' } }
        await axios.post(`/api/rides/leave/${ride}`, { rider: passenger.user._id }, config)
        dispatch({
            type: LEAVE_RIDE,
            payload: passenger
        })
    }


    const getRides = async () => {
        const res = await axios.get('/api/rides')
        dispatch({
            type: GET_RIDES,
            payload: res.data
        })
    }

    const getRide = async (ride) => {
        console.log(ride);
        if (ride === "") return
        const res = await axios.get(`/api/rides/get/${ride}`)
        return res.data
    }

    return (
        <RideContext.Provider
            value={{
                rides: state.rides,
                search: state.search,
                driverRide: state.driverRide,
                riderRide: state.riderRide,
                ride: state.ride,
                passengers: state.passengers,
                searchRide,
                createRide,
                editRide,
                deleteRide,
                requestRide,
                acceptRequest,
                purchaseRide,
                completeRide,
                joinRide,
                leaveRide,
                getRides,
                getRide
            }}>
            {props.children}
        </RideContext.Provider>
    )
}

export default RideState
