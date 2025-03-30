{/*
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:'AIzaSyBqcI1UfD0ii4P3ZEBa-5kaabFdFNyvAfo'});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Give me short crypto preditions based on the lastest news that affect this market",
  });
  console.log(response.text);
*/}

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_KEY});

async function GeminiCall(moedas) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `Responde-me ao seguinte prompt em Português de Portugal.INÍCIO Resume as notícias mais relevantes sobre estas ${moedas} da última semana e não me contes mais informações sobre outras moedas. Concentra-te apenas nas criptomoedas que tiveram as maiores variações (quedas ou subidas). Explica brevemente os motivos por trás dessas mudanças. Limita a resposta a 3 linhas. Dá-me também uma possível direção do preço da moeda, mas apenas para cima ou para baixo, isto é, não dês valores numéricos. FIM`,
    });

    return response.text;  // Retorna o texto gerado pela API
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "Houve um erro ao tentar obter as informações.";  // Retorna uma mensagem de erro
  }
}

export default GeminiCall;
