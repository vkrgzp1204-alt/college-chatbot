import dotenv from "dotenv";
dotenv.config();

export async function collegechatbot(userQuery) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a polite and helpful chatbot.\n\nUser: ${userQuery}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // 🔴 DEBUG ERROR
    if (!response.ok) {
      console.error("FULL ERROR:", data);
      return "API error. Check terminal.";
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text 
        || "No response from AI.";

  } catch (error) {
    console.error("FETCH ERROR:", error);
    return "Server error. Try again.";
  }
}