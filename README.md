# Refactor & Test con IA
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

### Generar test de un repositorio

Recomiendo el uso de versionado de codigo (como git) para no perder archivos o test ya existentes.

```bash
npm run testRepository -- ../url/local/del/repositorio
```

### Generar test de un archivo

Recomiendo el uso de versionado de codigo (como git) para no perder archivos o test ya existentes.

```bash
npm run testFile -- ../url/local/del/archivo.js
```

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