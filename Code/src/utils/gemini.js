const { GoogleGenerativeAI } = require("@google/generative-ai");

const generativeClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const executeAIQuery = async (customPromptText) => {
  try {
    const selectedModel = generativeClient.getGenerativeModel({ model: "gemini-1.5-flash" });
    const rawResult = await selectedModel.generateContent(customPromptText);
    const resolvedResponse = await rawResult.response;
    return resolvedResponse.text();
  } catch (aiError) {
    console.error("Gemini processing error encountered:", aiError.message);
    throw new Error("Failed to communicate with artificial intelligence engine.");
  }
};

module.exports = { executeAIQuery };