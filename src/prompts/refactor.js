function generatePrompt({ code }) {
    return `
        Eres un experto en JavaScript y refactorización.
        Mejora la legibilidad y mantenibilidad del siguiente código sin cambiar su comportamiento:
        \`\`\`js
        ${code}
        \`\`\`
    `;
}

export default generatePrompt

