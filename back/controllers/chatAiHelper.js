const OpenAI = require("openai");

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";


// Function that processes user messages


exports.processChatRequest = async (prompt) => {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Invalid input: Prompt must be a non-empty string");
  }

  if (prompt.length > 4000) {
    throw new Error(
      "Invalid input: Prompt exceeds maximum length (4000 characters)"
    );
  }

  const sanitizedPrompt = prompt.trim();

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  try {

    // Tell the AI how to behave 
    const systemMessage = `You are a helpful coding assistant. When generating code:
1. Always put code in Markdown code blocks using triple backticks and include the language name
2. Format code cleanly with proper indentation
3. Add brief comments to explain key parts
4. Keep explanations clear and concise
5. Example of proper code formatting:
\`\`\`javascript
function example() {
  // Your code here
  return result;
}
\`\`\``;

// Send the user's question along with instructions to the AI

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: sanitizedPrompt },
      ],
      temperature: 0.7,
      top_p: 0.95,
      model: model,
    });

      // Get the AI's response and send it back


    return response.choices[0].message.content;
  } catch (err) {
    if (err.status === 429) {
      console.error("Rate limit exceeded:", err);
      throw new Error(
        "Service is currently experiencing high demand. Please try again later."
      );
    } else if (err.status === 401 || err.status === 403) {
      console.error("Authentication error:", err);
      throw new Error(
        "Authentication failed. Please check your API credentials."
      );
    } else {
      console.error("Error processing chat request:", err);
      throw new Error("Failed to process your request. Please try again.");
    }
  }
};
