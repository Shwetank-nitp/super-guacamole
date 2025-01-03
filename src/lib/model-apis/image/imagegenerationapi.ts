import { HfInference } from "@huggingface/inference";

const imageGeneration = async (prompt: string) => {
  try {
    const hf = new HfInference(process.env.HF_TOKEN, {
      use_cache: false,
    });
    const response = await hf.textToImage({
      model: process.env.IMAGE_GEN_MODEL,
      inputs: prompt,
      parameters: {
        height: 512,
        width: 512,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default imageGeneration;
