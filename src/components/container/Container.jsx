import React from 'react'

const Container = ({ children }) => {
    return <div className='w-full max-w-7xl mx-auto px-1'>{children}</div>;   // in one line of Element it's not necessary to have ( ) 
}

export default Container