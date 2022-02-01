import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineCar, AiOutlineCompass } from 'react-icons/ai'
import "./footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <Link to="/" className="link"><AiOutlineCompass className="icon" /></Link>
            <Link to="/drive" className="link"><AiOutlineCar className="icon" /></Link>
        </div>
    )
}

export default Footer
