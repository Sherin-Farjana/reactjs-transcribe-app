import React from 'react'

// Component responsible for rendering final transcription text
export default function Transcription(props) {
    // Pre-rendered text element containing transcription output
    const { textElement } = props

    // Pre-rendered text element containing transcription output
    return (
        <div>{textElement}</div>
    )
}
