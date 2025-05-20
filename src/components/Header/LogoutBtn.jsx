import React from 'react'
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"   // getting logout
import { logout } from "../../store/authSlice"

const LogoutBtn = () => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        // most of the things in appwrite is promise so to handle promise we'll use promise handler      
        authService.logout().then(() => {
            dispatch(logout()) // it will udate my reducer state
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>  
    )
}

export default LogoutBtn