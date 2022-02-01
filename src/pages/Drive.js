import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import CreateRide from '../components/CreateRide'
import DriverRide from '../components/DriverRide'
import RideContext from '../context/ride/rideContext'
import UserContext from '../context/users/userContext'
import Passengers from '../components/Passengers'

const Drive = () => {
    const rideContext = useContext(RideContext)
    const { driverRide, getRide, createRide } = rideContext

    const userContext = useContext(UserContext)
    const { user } = userContext

    useEffect(() => {
        getRide(user.user.ride)
    },[])
    return (
        <Layout>
            <Menu />
            <CreateRide />
            {driverRide && 
                <div>
                    <DriverRide />
                    <Passengers />
                </div>
            }
        </Layout>
    )
}

export default Drive
