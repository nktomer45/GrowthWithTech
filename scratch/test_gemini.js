const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function listModels() {
  try {
    const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy
    // The SDK doesn't have a direct listModels, but we can try to fetch a model info
    console.log("API Key present:", !!process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent("test");
    console.log("Success:", response.response.text());
  } catch (err) {
    console.error("Error:", err.message);
    if (err.status) console.log("Status:", err.status);
    if (err.statusText) console.log("StatusText:", err.statusText);
  }
}

listModels();
