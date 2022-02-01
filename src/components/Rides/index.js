import React, { useContext, useState, useEffect } from 'react'
import Ride from './Ride'
import RideContext from '../../context/ride/rideContext'
import "./rides.css"

const Rides = () => {
    const rideContext = useContext(RideContext)
    const { rides, search, getRides } = rideContext

    const [searchView, setSearchView] = useState(false)

    useEffect(() => {
        getRides()
        const onSearch = async () => {
            await setSearchView(true)
        }
        search && onSearch()
    }, [search])

    return (
        <div className="rides">
            {searchView === true ? (search && search.map((ride, index) => {
                return <Ride key={index} ride={ride} />
            })) : (rides && rides.rides.map((ride, index) => {
                return <Ride key={index} ride={ride} />
            }))}
        </div>
    )
}

export default Rides
