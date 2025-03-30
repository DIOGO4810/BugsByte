import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_KEY});

async function GeminiCall(moedas) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `Resuma as notícias mais relevantes sobre estas ${moedas} da última semana e não me contes mais informações sobre outras moedas. Concentre-se apenas nas criptomoedas que tiveram as maiores variações (quedas ou subidas). Explique brevemente os motivos por trás dessas mudanças. Limite a resposta a 3 linhas.`,
    });

    return response.text;  // Retorna o texto gerado pela API
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "Houve um erro ao tentar obter as informações.";  // Retorna uma mensagem de erro
  }
}

export default GeminiCall;
