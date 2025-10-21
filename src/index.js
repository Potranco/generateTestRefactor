import fs from 'fs';
import path from 'path';
import ollama from 'ollama'; // ✅ versión Node correcta

const modelo = 'deepseek-coder-v2'; // o 'qwen2.5-coder:14b'

// --- CLI ---
const rutaProyecto = process.argv[2];
if (!rutaProyecto) {
  console.error('❌ Debes indicar la ruta del proyecto. Ejemplo:');
  console.error('   node agente.js /ruta/a/tu/proyecto');
  process.exit(1);
}

const SRC_DIR = path.join(rutaProyecto, 'src');
const TEST_DIR = path.join(rutaProyecto, 'tests');
const REFACTOR_DIR = path.join(rutaProyecto, 'refactors');

// --- Crear carpetas ---
[TEST_DIR, REFACTOR_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// --- Obtener archivos JS / TS ---
function obtenerArchivos(dir) {
  const archivos = [];
  if (!fs.existsSync(dir)) return archivos;

  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) archivos.push(...obtenerArchivos(full));
    else if (/\.(js|ts|jsx|tsx)$/.test(file)) archivos.push(full);
  }
  return archivos;
}

// --- Generar test ---
async function generarTest(rutaArchivo) {
  const codigo = fs.readFileSync(rutaArchivo, 'utf8');
  const nombre = path.basename(rutaArchivo).replace(/\.(js|ts|jsx|tsx)$/, '.test.js');
  const salida = path.join(TEST_DIR, nombre);
  
  const response = await fetch("http://localhost:3001/api/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filePath: rutaArchivo,
      code: codigo,
      testSystem: "vitest @testing-library" // 👈 o "jest", "mocha", "ava"
    })
  });

  const data = await response.json();
  console.log(data);
}

// --- Main ---
async function main() {
  console.log(`🚀 Iniciando análisis en: ${rutaProyecto}`);
  const archivos = obtenerArchivos(SRC_DIR);

  if (archivos.length === 0) {
    console.log('⚠️ No se encontraron archivos en la carpeta src.');
    return;
  }

  for (const archivo of archivos) {
    if (archivo.search('.test.') === -1){
      console.log(`\n📄 Procesando: ${archivo}`);
      await generarTest(archivo);
    } 
    // await refactorizar(archivo);
  }

  console.log('\n✅ Proceso completado.');
}

main()