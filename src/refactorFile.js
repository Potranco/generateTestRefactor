import fs from 'fs';
import path from 'path';
import createRefactorFile from './generators/createRefactorFile.js'

// --- CLI ---
const rutaFile = process.argv[2];
const model = process.argv[3] || 'deepseek';

if (!rutaFile) {
  console.error('❌ Debes indicar la ruta del archivo. Ejemplo:');
  console.error('   node agente.js /ruta/a/tu/proyecto/file.js');
  process.exit(1);
}

// --- Generar refactor ---
async function generarRefactor(rutaArchivo) {
  const codigo = fs.readFileSync(rutaArchivo, 'utf8');
  const response = await createRefactorFile(rutaArchivo, codigo, model)
  
  console.log(response);
}

// --- Main ---
async function main() {
  console.log(`🚀 Iniciando análisis (${model}): ${rutaFile}`);
  
  if (!fs.existsSync(rutaFile)) {
    console.log('⚠️ No se encontro el archivo.')
    return ;
  }

  if (fs.statSync(rutaFile).isDirectory()) {
    console.log('⚠️ Es un directorio.')
    return ;
  }
    
  console.log(`\n📄 Procesando: ${rutaFile}`);
  await generarRefactor(rutaFile);
  console.log('\n✅ Proceso completado.');
}

main()