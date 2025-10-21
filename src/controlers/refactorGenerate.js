import fs from "fs";
import path from "path";
import { callOllama } from "../utils/ollamaClient.js";

export async function generarRefactor(req, res) {
  try {
    const { filePath, code } = req.body;

    const prompt = `
Eres un experto en JavaScript y refactorización.
Mejora la legibilidad y mantenibilidad del siguiente código sin cambiar su comportamiento:
\`\`\`js
${code}
\`\`\`
`;

    const respuesta = await callOllama(prompt);

    const refactorDir = path.join(path.dirname(filePath), "refactors");
    fs.mkdirSync(refactorDir, { recursive: true });

    const refactorPath = path.join(refactorDir, path.basename(filePath));
    fs.writeFileSync(refactorPath, respuesta);

    res.json({ ok: true, file: refactorPath });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
