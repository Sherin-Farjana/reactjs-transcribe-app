import React from 'react'

export default function Header() {
    return (

        // Header section with site title and "New" button
        <header className='flex items-center justify-between gap-4 p-4'>
            {/* Site logo / title, clickable to navigate home */}
            <a href="/"><h1 className='font-medium text-2xl'>Deep<span className='text-blue-400 bold'>Scribe</span></h1></a>

            {/* Right-side button section */}
            <div className='gap-4 flex items-center '>
                {/* Button for creating a new file or recording */}
                <a href="/" className='flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-blue-400'>
                    <p>New</p>
                    <i className="fa-solid fa-plus"></i>
                </a>
            </div>
        </header>
    )
}
