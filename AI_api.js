

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI({apiKey:'AIzaSyBkPAD2F1Oq7HagALUomC_pRZmAjAitABU'});

async function main() {

    const prompt = "Explain how you work";


    const model = ai. getGenerativeModel({model: "gemini-2.0-flash",});
    const response = await model.generateContent(prompt);

  console.log(response.text);
}

main();