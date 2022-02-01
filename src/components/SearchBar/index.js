import React, { useContext, useState } from 'react'
import "./searchbar.css"
import RideContext from '../../context/ride/rideContext'
import "../../styles/components.css"

const SearchBar = () => {
    const rideContext = useContext(RideContext)
    const { searchRide, rides } = rideContext

    const onSearch = e => {
        searchRide(e.target.value)
    }

    return (
        <div className="searchbar">
            <input placeholder="Search for rides" className="formInput searchInput" onChange={onSearch} />
        </div>
    )
}

export default SearchBar
