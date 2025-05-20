import React from 'react'
import logo from "/logo.png";

const Logo = ({ width = "100px" }) => {
    return (
        <img src={logo} alt="" className='w-[100px] ' />
    )
}

export default Logo