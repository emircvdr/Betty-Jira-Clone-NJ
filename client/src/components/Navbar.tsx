

import React from 'react'

const Navbar = (
    { pageTitle }: { pageTitle: string }
) => {
    return (
        <div className='w-full h-full bg-red-500'>
            <h1 className='text-white text-2xl font-bold text-center py-3'>{pageTitle}</h1>
        </div>
    )
}

export default Navbar