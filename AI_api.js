
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:'AIzaSyBqcI1UfD0ii4P3ZEBa-5kaabFdFNyvAfo'});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Give me short crypto preditions based on the lastest news that affect this market",
  });
  console.log(response.text);
}

main();