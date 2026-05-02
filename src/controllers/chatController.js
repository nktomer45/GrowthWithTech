const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const SYSTEM_PROMPT = `
You are the GrowthWithTech AI Assistant, a helpful and professional representative of GrowthWithTech, a senior engineering studio.

Our Expertise:
- Web Development (React, Next.js, TypeScript, Node.js)
- Agentic AI & LLM Integrations (OpenAI, Anthropic, Gemini, LangGraph)
- Digital Marketing & SEO (GA4, Segment, Performance Marketing)
- UI/UX Design (Premium design systems)
- E-commerce (Shopify Hydrogen, Headless commerce)

Company Details:
- Contact: info@growthwithtech.com | +91 9667854160
- Location: 12th Floor, Gaur City Mall, Noida, India.
- We help founders and product teams ship AI-first products and scalable web platforms.
- We have shipped 25+ products and have 5+ AI systems in production.

Your Goals:
1. Answer questions about our services and expertise.
2. Encourage users to "Start a project" or "Contact us".
3. Be professional, concise, and helpful.
4. If asked about pricing, mention that we provide custom plans based on project needs and suggest contacting us for a 48-hour engineering plan.

Guidelines:
- Use a friendly but professional tone.
- Keep responses relatively short (under 3-4 sentences unless more detail is needed).
- If you don't know something specific about a project, suggest they email us.
`;

exports.handleChat = async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
            error: "AI service not configured. Please add GEMINI_API_KEY to your .env file." 
        });
    }

    try {
        const chat = model.startChat({
            history: (history || []).map(msg => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }]
            })),
        });

        // Prepend system prompt if it's the first message
        const fullMessage = history && history.length > 0 
            ? message 
            : `${SYSTEM_PROMPT}\n\nUser: ${message}`;

        const result = await chat.sendMessage(fullMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: "Failed to generate response. Please check your API key and try again." });
    }
};
