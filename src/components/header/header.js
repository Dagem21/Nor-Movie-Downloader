import React, { useEffect, useState, memo, Fragment } from 'react'

const Header = memo((props) => {
    return (
        <div className="flex justify-between px-4 py-3">
            <h1 className='text-xl font-bold'>Dagem</h1>
            <button className='flex items-center'>
                <svg width="20px" height="20px" viewBox="0 0 0.375 0.375" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <title>Logout</title>
                    <path d="m0.338 0.188 -0.075 0.081m0.075 -0.081 -0.075 -0.075m0.075 0.075H0.1m0.1 0.15H0.038v-0.3H0.2" stroke="#FFFFFF" strokeWidth="0.04" />
                </svg>
            </button>
        </div>
    )
})

export default Header