import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function chatWithGemini(prompt, lang = "en", simplify = false) {
  const finalPrompt = simplify 
    ? `Explain this like I'm 5 in ${lang}: ${prompt}`
    : `Reply in ${lang}: ${prompt}`;

  const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: finalPrompt }] }]
    })
  });

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No reply from Gemini";
}
