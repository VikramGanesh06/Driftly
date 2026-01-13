
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getLocalInsights(location: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 short, specific tips for tourists booking boats in ${location}, India. Focus on: best time for views, a local dish to eat nearby, and a safety tip. Use Indian English.`,
      config: {
        systemInstruction: "You are Driftly AI, an expert on Indian coastal tourism. Be concise, friendly, and practical.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ensure you wear life jackets and carry sun protection. Enjoy your ride!";
  }
}

export async function planTrip(location: string, passengers: number) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Plan a 3-hour boat itinerary for ${passengers} people in ${location}. Focus on local landmarks and the Sea-to-Plate experience.`,
      config: {
        systemInstruction: "You are a professional boat trip planner for Driftly India.",
      }
    });
    return response.text;
  } catch (error) {
    return "A standard 3-hour trip includes coastal sightseeing and a local snack session.";
  }
}
