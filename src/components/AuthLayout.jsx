import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'


const AuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        } else {
            setLoader(false)
        }
    }, [authStatus, navigate, authentication])

    return loader ? <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
        <ClipLoader color="#4f46e5" size={50} aria-label="Loading content" />
    </div> : <>{children}</>
}

export default AuthLayout