import React, { useContext, useState } from 'react'
import Sheet from 'react-modal-sheet';
import RideContext from '../../context/ride/rideContext'
import UserContext from '../../context/users/userContext';

const SelectRide = ({ isOpen, setOpen, ride }) => {
    const { destination, pickupLocation, pickupTime, seatFee, seatLimit } = ride

    const rideContext = useContext(RideContext)
    const { driverRide, editRide, deleteRide, joinRide, leaveRide, riderRide } = rideContext

    const userContext = useContext(UserContext)
    const { isDriver, user } = userContext

    const [selectedRide, setSelectedRide] = useState(ride)
    const [edit, setEdit] = useState(false)

    const onChange = (e) => {
        setSelectedRide({ ...selectedRide, [e.target.name]: e.target.value })
    }

    const onDelete = () => {
        deleteRide(selectedRide._id)
        setOpen(false)
    }

    const onEdit = () => {
        setEdit(!edit)
    }

    const onSave = (e) => {
        e.preventDefault()
        editRide(selectedRide)
        setOpen(false)
    }

    const onLeave = () => {
        leaveRide(user._id)
    }

    return (
        <div></div>
        // <div>
        //     <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        //         <Sheet.Container>
        //             <Sheet.Header />
        //             <Sheet.Content>
        //                 <div className="container">
        //                     {edit ? (
        //                         <form onSubmit={onSave}>
        //                             <input name="destination" value={selectedRide.destination} className="formInput" onChange={onChange} />
        //                             <input name="pickupLocation" value={selectedRide.pickupLocation} className="formInput" onChange={onChange} />
        //                             <input name="pickupTime" value={selectedRide.pickupTime} className="formInput" onChange={onChange} />
        //                             <input name="seatLimit" value={selectedRide.seatLimit} className="formInput" onChange={onChange} />
        //                             <input name="seatFee" value={selectedRide.seatFee} className="formInput" onChange={onChange} />
        //                             <button type="submit" className="formButton bodyMd w-bold">Save</button>
        //                         </form>
        //                     ) : (
        //                         <div>
        //                             <p className="bodyMd w-reg">Going to {destination} at {pickupTime}.</p>
        //                         </div>
        //                     )}

        //                     {/* If they don't own the ride then they can edit it */}
        //                     {riderRide == null  ? (
        //                         <button onClick={() => joinRide(ride._id, user)} className="formButton bodyMd w-bold">Join Carpool</button>
        //                     ) : (
        //                         <div>
        //                             <button onClick={onLeave} className="formButton bodyMd w-bold">Leave</button>
        //                             {/* <button onClick={onEdit} className="formButton bodyMd w-bold">Edit</button>
        //                             <button onClick={onDelete} className="formButton bodyMd w-bold">Delete</button> */}
        //                         </div>
        //                     )}

        //                     {/* If drivermode than can edit or delete & ride is theirs ***** */}
        //                     {/* If rider and in the carpool than can leav */}
        //                 </div>
        //             </Sheet.Content>
        //         </Sheet.Container>
        //         <Sheet.Backdrop />
        //     </Sheet>
        // </div>
    )
}

export default SelectRide
