// ============================================
// SCRIPT: Crear sprite SVG automáticamente
// Combina todos los archivos .svg en uno solo
// ============================================

const fs = require('fs');
const path = require('path');

// Carpeta donde están tus SVG individuales
const svgFolder = './svg';

// Archivo de salida (sprite)
const outputFile = './svg/icons.svg';

// Array para guardar los symbols
let symbols = [];

// Leer todos los archivos de la carpeta svg/
const files = fs.readdirSync(svgFolder);

files.forEach(file => {
    // Solo procesar archivos .svg (excepto icons.svg)
    if (file.endsWith('.svg') && file !== 'icons.svg') {
        const filePath = path.join(svgFolder, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Extraer viewBox
        const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
        const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
        
        // Extraer contenido interno del SVG
        const innerContent = content
            .replace(/<svg[^>]*>/, '')  // Quitar etiqueta <svg> de apertura
            .replace(/<\/svg>/, '')      // Quitar etiqueta </svg> de cierre
            .trim();
        
        // Crear ID del icono (nombre del archivo sin .svg)
        const iconId = file.replace('.svg', '-icon');
        
        // Crear el symbol
        const symbol = `
    <!-- ${file} -->
    <symbol id="${iconId}" viewBox="${viewBox}">
        ${innerContent}
    </symbol>`;
        
        symbols.push(symbol);
        
        console.log(`✅ Procesado: ${file} → #${iconId}`);
    }
});

// Crear el archivo sprite completo
const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${symbols.join('\n')}
</svg>`;

// Guardar el archivo
fs.writeFileSync(outputFile, spriteContent);

console.log(`\n🎉 Sprite creado: ${outputFile}`);
console.log(`📦 Total de iconos: ${symbols.length}`);