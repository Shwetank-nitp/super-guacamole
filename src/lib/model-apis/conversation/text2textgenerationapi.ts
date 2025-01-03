import { conversation } from "@/app/dashboard/(routes)/conversation/page";
import { HfInference } from "@huggingface/inference";

const generateResponse = async (conversations: conversation[]) => {
  try {
    const hf = new HfInference(process.env.HF_TOKEN!, {
      use_cache: false,
    });
    const chatCompletion = await hf.chatCompletion({
      model: process.env.CONVERSATION_MODEL,
      messages: conversations,
      max_tokens: 500,
      headers: {
        "x-user-cache": "false",
      },
    });
    return chatCompletion.choices[0].message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default generateResponse;
