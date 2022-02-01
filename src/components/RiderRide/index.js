import React, { useState } from 'react'
import RiderSelect from '../RiderSelect'

const RiderRide = ({ ride }) => {
    const { destination, pickupLocation, pickupTime, passengers, seatLimit } = ride

    const [isOpen, setOpen] = useState(false);

    return (
        <div onClick={() => setOpen(true)}>
            <p>{destination}</p>
            <p>{pickupLocation}</p>
            <RiderSelect isOpen={isOpen} setOpen={setOpen} ride={ride} />
        </div>
    )
}

export default RiderRide
