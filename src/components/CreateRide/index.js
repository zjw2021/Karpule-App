import React, { useContext, useState } from 'react'
import RideContext from '../../context/ride/rideContext'
import UserContext from '../../context/users/userContext';
import Sheet from 'react-modal-sheet';


const CreateRide = () => {

    const rideContext = useContext(RideContext)
    const { createRide, driverRide } = rideContext

    const userContext = useContext(UserContext)
    const { user } = userContext

    const [ride, setRide] = useState({
        destination: "",
        pickupLocation: "",
        pickupTime: "",
        seatLimit: "",
        seatFee: ""
    })

    const { destination, pickupLocation, pickupTime, seatLimit, seatFee } = ride

    const resetForm = () => {
        setRide({
            destination: "",
            pickupLocation: "",
            pickupTime: "",
            seatLimit: "",
            seatFee: ""
        })
    }

    const onChange = (e) => {
        setRide({ ...ride, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createRide(ride, user)
        resetForm()
        setOpen(false)
    }

    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            {driverRide === null ?
                <p className="bodyLg w-med" onClick={() => setOpen(true)}>+ Ride</p>
                :
                <p className="bodyLg w-med">Current Ride</p>
            }
            {driverRide === null && <p className="bodyMd w-reg">You don't have any rides</p>}
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className="container">
                            <div className="form">
                                <form onSubmit={onSubmit}>
                                    <div className="logoContainer">
                                        <p className="titleXl logo">Create ride +</p>
                                        <p className="bodyMd">Karpule Driver Mode</p>
                                    </div>
                                    <input name="destination" placeholder="destination" className="formInput" value={destination} onChange={onChange} />
                                    <input name="pickupLocation" placeholder="pickup" className="formInput" value={pickupLocation} onChange={onChange} />
                                    <input name="pickupTime" placeholder="time" className="formInput" value={pickupTime} onChange={onChange} />
                                    <input name="seatLimit" placeholder="limit" className="formInput" value={seatLimit} onChange={onChange} />
                                    <input name="seatFee" placeholder="fee" className="formInput" value={seatFee} onChange={onChange} />
                                    <button type="submit" className="formButton bodyMd w-bold">Create</button>
                                </form>
                            </div>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    )
}

export default CreateRide