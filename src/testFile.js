import fs from 'fs';
import path from 'path';
import createTestFile from './generators/createTestFile.js'

const modelo = 'deepseek';
const testSystem = "vitest @testing-library"

// --- CLI ---
const rutaFile = process.argv[2];
if (!rutaFile) {
  console.error('❌ Debes indicar la ruta del archivo. Ejemplo:');
  console.error('   node agente.js /ruta/a/tu/proyecto/file.js');
  process.exit(1);
}

// --- Generar test ---
async function generarTest(rutaArchivo) {
  const codigo = fs.readFileSync(rutaArchivo, 'utf8');
  const nombre = path.basename(rutaArchivo).replace(/\.(js|ts|jsx|tsx)$/, '.test.js');

  const response = await createTestFile(rutaArchivo, codigo, testSystem, modelo)
  
  console.log(response);
}

// --- Main ---
async function main() {
  console.log(`🚀 Iniciando análisis: ${rutaFile}`);
  
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