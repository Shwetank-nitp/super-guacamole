import { HfInference } from "@huggingface/inference";

const musicGeneration = async (input: string) => {
  try {
    const hf = new HfInference(process.env.HF_TOKEN, {
      use_cache: false,
    });
    const musicblob = await hf.textToSpeech({
      model: process.env.MUSIC_GEN_MODEL,
      inputs: input,
    });
    return musicblob;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default musicGeneration;
