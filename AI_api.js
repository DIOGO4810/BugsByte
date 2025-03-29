

import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({apiKey:});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  console.log(response.text);
}

main();