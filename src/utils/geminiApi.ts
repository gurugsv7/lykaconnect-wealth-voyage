const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyDMQ2tyQohqMk16n7EiaBIJh88b2XI6Ljs"; // Hardcoded API key

export async function fetchGeminiAnswer(prompt: string): Promise<string> {
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });
  if (!res.ok) throw new Error("Gemini API error");
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer from Gemini.";
}
