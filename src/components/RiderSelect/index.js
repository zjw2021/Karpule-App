import React, { useContext, useEffect, useState } from 'react'
import Sheet from 'react-modal-sheet';
import RideContext from '../../context/ride/rideContext'
import UserContext from '../../context/users/userContext';

const RiderSelect = ({ isOpen, setOpen, ride }) => {
    const { destination, pickupLocation, pickupTime, seatFee, seatLimit, _id, passengers } = ride

    const rideContext = useContext(RideContext)
    const { joinRide, leaveRide, riderRide } = rideContext

    const userContext = useContext(UserContext)
    const { user, getUser } = userContext

    const [driver, setDriver] = useState()

    useEffect(() => {
        const getDriver = async () => {
            const data = await getUser(ride.driver)
            setDriver(data)
        }
        getDriver()
    }, [])

    const onJoin = () => {
        joinRide(_id, user)
    }

    const onLeave = () => {
        leaveRide(_id, user)
    }

    return (
        <div>
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className="container">
                            <p className="titleXl">Current Ride</p>
                            <p className="bodyMd">Going to {destination}</p>
                            <p className="bodyMd">Meet in {pickupLocation} at {pickupTime}</p>

                            {driver &&
                                <div>
                                    <p className="bodyMd w-bold">Car Info</p>
                                    <p className="bodyMd">{driver.carColor} {driver.carModel}</p>
                                    <p className="bodyMd">{driver.carPlate}</p>
                                    <p>Rider name</p>
                                    <p className="bodyMd w-bold">Contact Info</p>
                                    <p className="bodyMd">{driver.email}</p>
                                </div>
                            }

                            {riderRide == null ? (
                                <button onClick={onJoin} className="formButton bodyMd w-bold">Join Carpool</button>
                            ) : (
                                <div>
                                    <button onClick={onLeave} className="formButton bodyMd w-bold">Leave</button>
                                </div>
                            )}

                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    )
}

export default RiderSelect

