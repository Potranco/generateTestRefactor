import fs from "fs";
import path from "path";
import { callOllama } from "../utils/ollamaClient.js";
import generatePrompt from '../prompts/refactor.js'

async function createRefactorFile(filePath, code, modelo = 'deepseek') {
  const start = Date.now();
  try {
    const prompt = generatePrompt({code})
    let respuesta = await callOllama(prompt, modelo);
        
    const testDir = path.dirname(filePath);
    const ext = path.extname(filePath)
    const testPath = path.join(testDir, path.basename(filePath).replace(ext, "_refactor"+ext));

    fs.writeFileSync(testPath, respuesta);

    return {
      ok: true,
      time: ((Date.now() - start) / 1000).toFixed(2)+' s',
      file: testPath
    };

  } catch (err) {
    return { 
      ok: false,
      time: ((Date.now() - start) / 1000).toFixed(2)+' s',
      error: err.message
    }
  }
}

export default createRefactorFile