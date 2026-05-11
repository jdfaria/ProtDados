import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    // Priority 1: Vite environment variable (recommended for GitHub/Vercel)
    if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY;
    }
    // Priority 2: Node process environment (common in AI Studio)
    if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
      return process.env.GEMINI_API_KEY;
    }
    return "";
  } catch (e) {
    return "";
  }
};

export async function askPrivacyAssistant(question: string) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API key missing. Configura VITE_GEMINI_API_KEY no teu ambiente.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: `És um Assistente Especialista em Privacidade e Proteção de Dados para jovens. 
        O teu objetivo é responder a dúvidas sobre como se proteger na internet, o que são dados pessoais, phishing, redes sociais, etc.
        As tuas respostas devem ser educativas, claras, seguras e adaptadas a uma linguagem jovem mas responsável.
        Se a pergunta não for sobre privacidade ou segurança digital, gentilmente informa que o teu foco é ajudar na proteção de dados e segurança online.
        Responde sempre em Português de Portugal.`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao contactar o assistente IA:", error);
    throw new Error("Não consegui obter uma resposta agora. Tenta mais tarde.");
  }
}
