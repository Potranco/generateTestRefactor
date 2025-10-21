import fs from 'fs';
import path from 'path';
import createTestFile from './generators/createTestFile.js'

const modelo = 'deepseek-coder-v2';

// --- CLI ---
const rutaFile = process.argv[2];
if (!rutaFile) {
  console.error('❌ Debes indicar la ruta del archivo. Ejemplo:');
  console.error('   node agente.js /ruta/a/tu/proyecto/file.js');
  process.exit(1);
}

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
  const salida = path.join(path.dirname(rutaArchivo), nombre);

  const response = await createTestFile(rutaArchivo, codigo, "vitest @testing-library")
  
  console.log(response);
}

// --- Main ---
async function main() {
  console.log(`🚀 Iniciando análisis en: ${rutaFile}`);
  
  if (!fs.existsSync(rutaFile)) {
    console.log('⚠️ No se encontro el archivo.')
    return ;
  }

  if (fs.statSync(rutaFile).isDirectory()) {
    console.log('⚠️ Es un directorio (npm run testRepository).')
    return ;
  }
    
  console.log(`\n📄 Procesando: ${rutaFile}`);
  await generarTest(rutaFile);
  console.log('\n✅ Proceso completado.');
}

main()