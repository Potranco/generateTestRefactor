const OLLAMA_URL = "http://localhost:11434/api/generate";

// Modelos recomendados para código/testing
const MODELS = {
  llama3: "llama3",
  mistral: "mistral",
  deepseek: 'deepseek-coder-v2'
};

// control timeout
const timeoutMs = 6000000

export async function callOllama(prompt, model = "deepseek") {
  // create control for timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const selectedModel = MODELS[model] || MODELS.deepseek;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //signal: controller.signal,
      body: JSON.stringify({
        model: selectedModel,
        prompt,
        temperature: 0,
        stream: false
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Ollama responded with status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const result = data.response || data.message?.content;

    if (!result) {
      throw new Error("El modelo devolvió undefined o vacío");
    }

    return result;
  } catch (err) {
    console.error("❌ Error en llamada a Ollama:", err.message);
    throw err;
  }
}
