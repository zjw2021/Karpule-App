import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import SearchBar from '../components/SearchBar'
import Rides from '../components/Rides'
import RideContext from '../context/ride/rideContext'
import RiderRide from '../components/RiderRide'

const Home = () => {
    const rideContext = useContext(RideContext)
    const { getRide, riderRide } = rideContext

    const [ride, setRide] = useState()
    useEffect(() => {
        const getCurrentRide = async () => {
            const data = await getRide(riderRide)
            setRide(data)
        }
        getCurrentRide()
    },[riderRide])

    return (
        <Layout>
            <Menu />
            <SearchBar />
            {ride && <RiderRide ride={ride} />}
            <Rides />
        </Layout>
    )
}

export default Home
