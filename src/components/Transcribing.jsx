import React from 'react'

// UI component responsible for displaying transcription progress state
export default function Transcribing(props) {
    // UI component responsible for displaying transcription progress state
    const { downloading } = props


    return (
        // Center-aligned container for transcription status UI
        <div className='flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 text-center pb-24 p-4'>

             {/* Status heading and dynamic sub-text */}
            <div className='flex flex-col gap-2 sm:gap-4'>

                <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'><span className='text-blue-400 bold'>Transcribing</span></h1>

                {/* Changes message based on model download state */}
                <p>{!downloading ? 'warming up cylinders' : 'core cylinders engaged'}</p>
            </div>

            {/* Animated loading bars */}
            <div className='flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full'>
                {[0, 1, 2].map(val => {
                    return (
                        // Individual animated progress bar
                        <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-400 loading ' + `loading${val}`}></div>
                    )
                })}
            </div>
        </div>
    )
}
