function generatePrompt({ code, testSystem }) {
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

export default generatePrompt

