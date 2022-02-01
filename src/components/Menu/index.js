import React, { useContext, useState, useEffect } from 'react'
import userContext from '../../context/users/userContext'
import "./menu.css"
import { BiMenu } from "react-icons/bi"

import Sheet from 'react-modal-sheet';


const Menu = () => {

    const Usercontext = useContext(userContext)
    const { user, logoutUser, isDriver, registerDriver } = Usercontext

    const onLogout = (e) => {
        e.preventDefault()
        logoutUser()
    }

    const [isOpen, setOpen] = useState(false);

    const [becomeDrive, setBecomeDriver] = useState(false)
    const [driverInfo, setDriverInfo] = useState({
        carPlate: "",
        carModel: "",
        carColor: ""
    })
    const { licensePlate, carModel, carColor } = driverInfo
    
    const resetForm = () => {
        setDriverInfo({
            carPlate: "",
            carModel: "",
            carColor: ""
        })
    }

    const onChange = (e) => {
        setDriverInfo({ ...driverInfo, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        registerDriver(driverInfo, user.user._id)
        resetForm()
        setOpen(false)
        setBecomeDriver(false)
    }

    useEffect(() => {
        !isOpen && setBecomeDriver(false)
    }, [isOpen])

    return (
        <div className="menu">
            <BiMenu className="profile" onClick={() => setOpen(true)} />
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className="container">
                            <div className="logoContainer">
                                <p className="titleXl logo">Karpule</p>
                                {becomeDrive && <p className="bodyMd">Become a driver</p>}
                            </div>
                            {becomeDrive ? (
                                <form onSubmit={onSubmit}>
                                    <input name="carModel" placeholder="car model" className="formInput" value={carModel} onChange={onChange} />
                                    <input name="carColor" placeholder="car color" className="formInput" value={carColor} onChange={onChange} />
                                    <input name="carPlate" placeholder="license plate" className="formInput" value={licensePlate} onChange={onChange} />
                                    <button type="submit" className="formButton bodyMd w-bold">Register</button>
                                </form>
                            ) : (
                                <div>
                                    <p className="bodyMd">Wallet</p>
                                    {!isDriver && <p className="bodyMd" onClick={() => setBecomeDriver(true)}>Drive with Karpule</p>}
                                    <p className="bodyMd">Legal</p>
                                    <p className="bodyMd">Need help?</p>
                                    <form onSubmit={onLogout} className="item">
                                        <button type="submit" className="formButton bodyMd w-bold">Logout</button>
                                    </form>
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

export default Menu
