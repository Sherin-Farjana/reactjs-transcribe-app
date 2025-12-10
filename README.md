# DeepScribe - Your AI-Powered Audio Transcription & Translation Assistant

**DeepScribe** is a modern, interactive **web application** built using **React, JavaScript, and Tailwind CSS**, designed to **record, transcribe, and translate audio files** efficiently.

---

## Live Demo

**https://sherin-reactjs-transcribe-app.netlify.app/**

---

## Project Overview

DeepScribe is a **single-page React application** that allows users to:

- Record audio directly through the browser or upload audio files (`.mp3` or `.wav`)
- Automatically transcribe the audio into text
- Translate the transcription into multiple languages using a **web worker**
- Copy or download the transcription/translation as a text file
- Track progress in real-time with interactive feedback

The app provides a clean and user-friendly interface for seamless audio-to-text workflows.

---

## Features

- **Record or upload audio** files directly from the browser
- **Real-time transcription** of audio input
- **Translation** of transcribed text into various languages
- **Copy and download** functionality for transcriptions and translations
- Smooth UI/UX with **Tailwind CSS**, **Font Awesome icons**, and responsive design
- Visual feedback during transcription/translation processing
- Interactive buttons and tab navigation for easy switching between **Transcription** and **Translation**

---

## Tech Stack

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| **React (Vite)**      | Frontend framework                  |
| **JavaScript (ES6+)** | Logic for recording & transcription |
| **Tailwind CSS**      | Styling and responsive layout       |
| **Font Awesome**      | UI icons                            |
| **Web Workers**       | Asynchronous translation processing |

---

## Project Structure

```
DEEPSCRIBE/
│
├── public/
│   └── deepscribe.ico                # Favicon
│
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app logic
│   ├── components/
│   │   ├── Header.jsx        # Header with logo and new file button
│   │   ├── HomePage.jsx      # Record/upload interface
│   │   ├── FileDisplay.jsx   # Display uploaded/recorded audio
│   │   ├── Information.jsx   # Transcription & translation tabs
│   │   ├── Transcription.jsx # Display transcription results
│   │   ├── Translation.jsx   # Display translation results
|   |   ├── Transcribing.jsx
│   │   └── Footer.jsx        # Footer with copyright and links
│   ├── utils/
│   │   ├── translate.worker.js  # Web worker for translation
|   |   ├── whisper.worker.js
│   │   └── presets.js           # Helper functions
│   └── index.css             # Global styles
├── index.html                # Root HTML file
└── README.md                 # Project documentation
```

---

## How to Use

1. **Record or Upload Audio**: Click "Record" or upload a `.mp3/.wav` file.
2. **Transcription**: Your audio will be automatically transcribed in real-time.
3. **Translation**: Switch to the "Translation" tab to translate the transcription into another language.
4. **Copy or Download**: Use the buttons to copy or download the results as a text file.

---

## Author

**Sherin Farjana**  
💼 Front End Developer | Specializing in C, C++, OpenGL, and Web Technologies  
🔗 [LinkedIn](https://www.linkedin.com/in/sherin-farjana)  
🔗 [GitHub](https://github.com/Sherin-Farjana)
