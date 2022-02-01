import React, { useState } from 'react'
import RiderSelect from '../RiderSelect'
import "../../styles/components.css"

const Ride = ({ ride }) => {
    const { destination, pickupLocation, pickupTime, fee, limit } = ride

    const [isOpen, setOpen] = useState(false);

    return (
        <div className="card" onClick={() => setOpen(true)}>
            <p className="bodyMd">Going to {destination} at {pickupTime}.</p>
            <p className="bodySm">Charging ${fee} per seat.</p>
            <RiderSelect isOpen={isOpen} setOpen={setOpen} ride={ride} />
        </div>
    )
}

export default Ride
