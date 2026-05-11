import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    // In Vite/Browser, process might not be defined
    if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
      return process.env.GEMINI_API_KEY;
    }
    // Fallback to empty string
    return "";
  } catch (e) {
    return "";
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function askPrivacyAssistant(question: string) {
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
