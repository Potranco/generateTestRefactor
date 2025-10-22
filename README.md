# Refactor & Test con IA en local
Proyecto para generar test y refactors con ai.

Genera automáticamente **tests unitarios** y sugerencias de **refactorización** para proyectos en **JavaScript y TypeScript** usando IA local.

---

## 🛠 Requisitos

- **Node.js 18+**  
- **Ollama** (servidor IA local)

---

## 💾 Instalación

1. Clonar el repositorio:  
```bash
git clone https://tu-repo.git
cd refactor-test-ai
```

# Generar test

## Generar test de un repositorio

Recomiendo el uso de versionado de codigo (como git) para no perder archivos o test ya existentes.

```bash
npm run testRepository -- ../url/local/del/repositorio
```

## Generar test de un archivo

Recomiendo el uso de versionado de codigo (como git) para no perder archivos o test ya existentes.

```bash
npm run testFile -- ../url/local/del/archivo.js
npm run testFile -- ../url/local/del/archivo.js name_model
npm run testFile -- ../url/local/del/archivo.js name_model name_testSystem1 name_testSystem1
```

## MODELOS (Name Model)
- llama3
- mistral
- deepseek (por defecto)

## TestSystems

Para indicar el testsystem tendremos que utilizar el modelo que queremos usar

- jest (por defecto)
- vitest
- mocha
- @testing-library
- typescript
- js
- es6
...

Tambien podemos usar varios:
- vitest @testing-library ...

## Ejemplo de archivo de test generado

```
import { render, screen } from '@testing-library/dom'
import './style.css'

test('canvas element is present', () => {
  render('<div id="canvas"></div>')
  const canvas = screen.getByRole('img')
  expect(canvas).toBeInTheDocument()
})
```

# Urls

- https://ollama.com/
- https://ollama.com/search

## Ai models

- https://ollama.com/library/deepseek-coder-v2
- https://ollama.com/library/llama3
- https://ollama.com/library/mistral

