import React from 'react'
import { LANGUAGES } from '../utils/presets'

// Handles language selection and translation triggering
export default function Translation(props) {
    const { textElement, toLanguage, translating, setToLanguage, generateTranslation } = props
    return (
        <>
            {/* Display original or translated text when not translating */}
            {(textElement && !translating) && (
                <p>{textElement}</p>
            )}

            {/* Language selector and translate action */}
            {!translating && (<div className='flex flex-col gap-1 mb-4'>

                {/* Label for target language selection */}
                <p className='text-xs sm:text-sm font-medium text-slate-400 mr-auto'>To language</p>
                <div className='flex items-stretch gap-2 sm:gap-4' >

                    {/* Target language dropdown */}
                    <select value={toLanguage} className='flex-1 outline-none w-full focus:outline-none bg-white text-black duration-200 p-2  rounded' onChange={(e) => setToLanguage(e.target.value)}>
                        <option value={'Select language'}>Select language</option>
                        {Object.entries(LANGUAGES).map(([key, value]) => {
                            return (
                                <option key={key} value={value}>{key}</option>
                            )
                        })}

                    </select>

                    {/* Initiates translation pipeline */}
                    <button onClick={generateTranslation} className='specialBtn px-3 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200'>Translate</button>
                </div>
            </div>)}
        </>
    )
}
