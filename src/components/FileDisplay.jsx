import { useRef, useEffect } from 'react'

export default function FileDisplay(props) {

    // Destructure props passed from parent component
    const { handleAudioReset, file, audioStream, handleFormSubmission } = props

    // Destructure props passed from parent component
    const audioRef = useRef()

    // Effect to update audio source whenever file or audioStream changes
    useEffect(() => {
        // Effect to update audio source whenever file or audioStream changes
        if (!file && !audioStream) { return }

        if (file) {
             // If a file is uploaded, set the audio source to the file URL
            console.log('HERE FILE', file)
            audioRef.current.src = URL.createObjectURL(file)
        } 
        else {
            // If recording audio, set the audio source to the audioStream URL
            console.log('EHER AUDIO', audioStream)
            audioRef.current.src = URL.createObjectURL(audioStream)
        }
    }, [audioStream, file]) // Runs whenever file or audioStream changes


    return (
        <main className='flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-full max-w-prose mx-auto'>

            {/* Page heading */}
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your <span className='text-blue-400 bold'>File</span></h1>

            {/* Display file name */}
            <div className=' flex flex-col text-left my-4'>
                <h3 className='font-semibold'>Name</h3>
                <p className='truncate'>{file ? file?.name : 'Custom audio'}</p>
            </div>

            {/* Audio player */}
            <div className='flex flex-col mb-2'>
                <audio ref={audioRef} className='w-full' controls>
                    Your browser does not support the audio element.
                </audio>
            </div>

            {/* Action buttons */}
            <div className='flex items-center justify-between gap-4'>

                 {/* Reset button to clear the audio */}
                <button onClick={handleAudioReset} className='text-white hover:text-blue-400 duration-200'>Reset</button>

                {/* Transcribe button to trigger form submission */}
                <button onClick={handleFormSubmission} className='specialBtn  px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium '>
                    <p>Transcribe</p>
                    <i className="fa-solid fa-pen-nib"></i>
                </button>
            </div>
        </main>
    )
}
