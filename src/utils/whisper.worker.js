import { pipeline } from '@xenova/transformers'
import { MessageTypes } from './presets'

// Singleton Whisper ASR pipeline
class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition'
    static model = 'openai/whisper-tiny.en'
    static instance = null

    // Initializes ASR pipeline only once
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, null, { progress_callback })
        }

        return this.instance
    }
}

// Listen for transcription inference requests
self.addEventListener('message', async (event) => {
    const { type, audio } = event.data
    if (type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio)
    }
})

// Handles audio transcription workflow
async function transcribe(audio) {

    // Notify UI that loading has started
    sendLoadingMessage('loading')

    let pipeline

    try {
        pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback)
    } catch (err) {
        console.log(err.message)
    }

    // Notify UI that model is ready
    sendLoadingMessage('success')

    const stride_length_s = 5

    // Tracker to aggregate partial and final ASR output
    const generationTracker = new GenerationTracker(pipeline, stride_length_s)

    // Execute Whisper inference with chunked decoding
    await pipeline(audio, {
        top_k: 0,
        do_sample: false,
        chunk_length: 30,
        stride_length_s,
        return_timestamps: true,
        callback_function: generationTracker.callbackFunction.bind(generationTracker),
        chunk_callback: generationTracker.chunkCallback.bind(generationTracker)
    })

    // Send final inference completion message
    generationTracker.sendFinalResult()
}

// Callback invoked during model loading to report download progress
async function load_model_callback(data) {
    const { status } = data

    // Forward progress events to main thread
    if (status === 'progress') {
        const { file, progress, loaded, total } = data
        sendDownloadingMessage(file, progress, loaded, total)
    }
}

// Sends model loading state (loading / success / error) to UI thread
function sendLoadingMessage(status) {
    self.postMessage({
        type: MessageTypes.LOADING,
        status
    })
}

// Sends detailed model download progress to UI thread
async function sendDownloadingMessage(file, progress, loaded, total) {
    self.postMessage({
        type: MessageTypes.DOWNLOADING,
        file,
        progress,
        loaded,
        total
    })
}

// Tracks partial and final transcription results during streaming ASR
class GenerationTracker {
    constructor(pipeline, stride_length_s) {
        this.pipeline = pipeline
        this.stride_length_s = stride_length_s
        this.chunks = []
        this.time_precision = pipeline?.processor.feature_extractor.config.chunk_length / pipeline.model.config.max_source_positions
        this.processed_chunks = []
        this.callbackFunctionCounter = 0
    }

    // Notifies main thread that inference has completed
    sendFinalResult() {
        self.postMessage({ type: MessageTypes.INFERENCE_DONE })
    }

    // Notifies main thread that inference has completed
    callbackFunction(beams) {
        this.callbackFunctionCounter += 1

         // Emit partial updates at fixed intervals to reduce UI churn
        if (this.callbackFunctionCounter % 10 !== 0) {
            return
        }

        // Select best scoring beam
        const bestBeam = beams[0]

        // Decode tokens into readable text
        let text = this.pipeline.tokenizer.decode(bestBeam.output_token_ids, {
            skip_special_tokens: true
        })

        // Decode tokens into readable text
        const result = {
            text,
            start: this.getLastChunkTimestamp(),
            end: undefined
        }

        createPartialResultMessage(result)
    }

     // Handles completed audio chunks returned by Whisper
    chunkCallback(data) {

        // Accumulate raw chunk data
        this.chunks.push(data)

        // Decode chunks with timestamps enabled
        const [text, { chunks }] = this.pipeline.tokenizer._decode_asr(
            this.chunks,
            {
                time_precision: this.time_precision,
                return_timestamps: true,
                force_full_sequence: false
            }
        )

         // Convert decoded chunks into normalized transcript segments
        this.processed_chunks = chunks.map((chunk, index) => {
            return this.processChunk(chunk, index)
        })

        // Send consolidated transcription result to main thread
        createResultMessage(
            this.processed_chunks, false, this.getLastChunkTimestamp()
        )
    }

    // Returns the timestamp of the last fully processed chunk
    getLastChunkTimestamp() {
        if (this.processed_chunks.length === 0) {
            return 0
        }
    }

    // Returns the timestamp of the last fully processed chunk
    processChunk(chunk, index) {
        const { text, timestamp } = chunk
        const [start, end] = timestamp

        return {
            index,
            text: `${text.trim()}`,
            start: Math.round(start),
            end: Math.round(end) || Math.round(start + 0.9 * this.stride_length_s)
        }

    }
}

// Sends finalized transcription results to the main UI thread
function createResultMessage(results, isDone, completedUntilTimestamp) {
    self.postMessage({
        type: MessageTypes.RESULT,
        results,
        isDone,
        completedUntilTimestamp
    })
}

// Sends streaming partial transcription updates to UI thread
function createPartialResultMessage(result) {
    self.postMessage({
        type: MessageTypes.RESULT_PARTIAL,
        result
    })
}

