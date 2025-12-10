import { pipeline } from '@xenova/transformers';

// Singleton translation pipeline for Web Worker context
class MyTranslationPipeline {
    static task = 'translation';
    static model = 'Xenova/nllb-200-distilled-600M';
    static instance = null;

    // Lazily initializes and reuses translation pipeline
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }

        return this.instance;
    }
}

// Listen for translation requests from main thread
self.addEventListener('message', async (event) => {

    // Initialize translation pipeline with progress reporting
    let translator = await MyTranslationPipeline.getInstance(x => {
        self.postMessage(x)
    })
    console.log(event.data)

    // Perform translation inference
    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_lang,
        src_lang: event.data.src_lang,

        // Emit incremental token decoding updates
        callback_function: x => {
            self.postMessage({
                status: 'update',
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
            })
        }
    })

    console.log('HEHEHHERERE', output)

    // Emit incremental token decoding updates
    self.postMessage({
        status: 'complete',
        output
    })
})