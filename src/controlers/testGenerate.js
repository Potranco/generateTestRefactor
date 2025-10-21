import fs from "fs";
import path from "path";
import { callOllama } from "../utils/ollamaClient.js";

function generatePrompt({ filePath, code, testSystem }) {
    return `
        Eres un experto en JavaScript y testing.
        Genera un archivo de test unitario usando ${testSystem} para el siguiente código:
        \`\`\`js
        ${code}
        \`\`\`
        Asegúrate de usar la sintaxis y funciones propias de ${testSystem}.
        Responde solo el contenido del test sin comentarios ni explicaciones solo codigo.
    `;
} 

export async function generarTest(req, res) {
  try {
    const start = Date.now();
    const { filePath, code, testSystem = 'jest' } = req.body;
    const prompt = generatePrompt({filePath, code, testSystem})
    let respuesta = await callOllama(prompt);
    /*
    // clean extra text
    if (respuesta.search('```js') === -1) {
      respuesta = respuesta.substring(3, respuesta.length - 4);
    } else {
      respuesta = respuesta.substring(5, respuesta.length - 4);
    }
    */
    
    const testDir = path.dirname(filePath);
    const ext = path.extname(filePath)
    const testPath = path.join(testDir, path.basename(filePath).replace(ext, ".test"+ext));

    fs.writeFileSync(testPath, respuesta);
    const execTime = 
    res.json({
      ok: true,
      time: ((Date.now() - start) / 1000).toFixed(2)+' s',
      file: testPath
    });

  } catch (err) {
    res.status(500).json({ 
      ok: false,
      time: ((Date.now() - start) / 1000).toFixed(2),
      error: err.message
    });
  }
}
