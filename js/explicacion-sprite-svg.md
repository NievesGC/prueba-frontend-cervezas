# 📚 EXPLICACIÓN COMPLETA: Script para Crear Sprite SVG Automáticamente

## 🎯 OBJETIVO DEL SCRIPT

Convertir esto:
```
svg/
├── filter.svg
├── close.svg
├── trash.svg
└── search.svg
```

En esto:
```
svg/
├── filter.svg
├── close.svg
├── trash.svg
├── search.svg
└── icons.svg  ← NUEVO ARCHIVO (sprite con todos los iconos)
```

---

## 🔍 CÓDIGO COMPLETO CON EXPLICACIONES LÍNEA POR LÍNEA

```javascript
// ============================================
// LÍNEA 1-2: IMPORTAR MÓDULOS DE NODE.JS
// ============================================

const fs = require('fs');
// ↑ ¿Qué es "require"?
// Es la forma de IMPORTAR módulos en Node.js (JavaScript del servidor)
// Similar a "import" en JavaScript moderno

// ↑ ¿Qué es "fs"?
// fs = File System (Sistema de Archivos)
// Es un módulo de Node.js que permite:
// - Leer archivos
// - Escribir archivos
// - Crear carpetas
// - Eliminar archivos
// etc.

const path = require('path');
// ↑ ¿Qué es "path"?
// Módulo para trabajar con rutas de archivos
// Ayuda a unir rutas de forma correcta en Windows, Mac y Linux
// Ejemplo: path.join('svg', 'filter.svg') → 'svg/filter.svg'


// ============================================
// LÍNEA 3-4: CONFIGURACIÓN
// ============================================

const svgFolder = './svg';
// ↑ Carpeta donde están tus archivos SVG individuales
// './' significa "en la carpeta actual"
// Resultado: './svg' = carpeta svg/ en tu proyecto

const outputFile = './svg/icons.svg';
// ↑ Archivo que se creará con todos los iconos combinados
// Resultado: './svg/icons.svg' = archivo icons.svg dentro de svg/


// ============================================
// LÍNEA 5: ARRAY PARA GUARDAR RESULTADOS
// ============================================

let symbols = [];
// ↑ Array vacío que se llenará con cada icono procesado
// Al final contendrá: ['<symbol>...</symbol>', '<symbol>...</symbol>', ...]


// ============================================
// LÍNEA 6: LEER TODOS LOS ARCHIVOS DE LA CARPETA
// ============================================

const files = fs.readdirSync(svgFolder);
// ↑ ¿Qué hace "readdirSync"?
// readdir = read directory (leer directorio)
// Sync = Synchronous (síncrono, espera a terminar)
//
// Lee todos los nombres de archivos en la carpeta './svg'
//
// EJEMPLO DE RESULTADO:
// files = ['filter.svg', 'close.svg', 'trash.svg', 'search.svg', 'icons.svg']


// ============================================
// LÍNEA 7-50: PROCESAR CADA ARCHIVO
// ============================================

files.forEach(file => {
    // ↑ Recorre cada archivo del array 'files'
    // En cada iteración, 'file' contiene el nombre de un archivo
    //
    // ITERACIÓN 1: file = 'filter.svg'
    // ITERACIÓN 2: file = 'close.svg'
    // ITERACIÓN 3: file = 'trash.svg'
    // etc.
    
    
    // ========================================
    // FILTRAR SOLO ARCHIVOS .SVG
    // ========================================
    
    if (file.endsWith('.svg') && file !== 'icons.svg') {
        // ↑ Condiciones:
        // 1. file.endsWith('.svg') → ¿Termina con .svg?
        // 2. file !== 'icons.svg' → ¿NO es el archivo de salida?
        //
        // ¿Por qué la segunda condición?
        // Para no procesar icons.svg si ya existe
        // (evitamos procesarlo a sí mismo)
        //
        // EJEMPLOS:
        // 'filter.svg' → ✅ PASA (termina en .svg y no es icons.svg)
        // 'close.svg'  → ✅ PASA
        // 'icons.svg'  → ❌ NO PASA (es icons.svg, lo excluimos)
        // 'imagen.png' → ❌ NO PASA (no termina en .svg)
        
        
        // ========================================
        // CONSTRUIR RUTA COMPLETA DEL ARCHIVO
        // ========================================
        
        const filePath = path.join(svgFolder, file);
        // ↑ Une la carpeta con el nombre del archivo
        //
        // EJEMPLO:
        // svgFolder = './svg'
        // file = 'filter.svg'
        // filePath = './svg/filter.svg'
        
        
        // ========================================
        // LEER EL CONTENIDO DEL ARCHIVO
        // ========================================
        
        const content = fs.readFileSync(filePath, 'utf-8');
        // ↑ Lee el archivo y devuelve su contenido como texto
        //
        // Parámetros:
        // - filePath: ruta del archivo
        // - 'utf-8': codificación (texto normal)
        //
        // EJEMPLO DE RESULTADO (filter.svg):
        // content = `
        // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        //     <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor" stroke-width="2"/>
        // </svg>
        // `
        
        
        // ========================================
        // EXTRAER EL VIEWBOX
        // ========================================
        
        const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
        // ↑ ¿Qué hace "match"?
        // Busca un patrón en el texto usando expresiones regulares
        //
        // Patrón: /viewBox="([^"]+)"/
        // Busca: viewBox="CUALQUIER_COSA_AQUÍ"
        // Y captura lo que está dentro de las comillas
        //
        // EJEMPLO:
        // content = '<svg viewBox="0 0 20 20">...'
        // viewBoxMatch = ['viewBox="0 0 20 20"', '0 0 20 20']
        //                 ↑ coincidencia completa  ↑ grupo capturado
        
        const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
        // ↑ Operador ternario (if corto)
        // Si viewBoxMatch existe → usa viewBoxMatch[1]
        // Si no existe → usa '0 0 24 24' por defecto
        //
        // EJEMPLO 1 (con viewBox):
        // viewBoxMatch = ['...', '0 0 20 20']
        // viewBox = '0 0 20 20'
        //
        // EJEMPLO 2 (sin viewBox):
        // viewBoxMatch = null
        // viewBox = '0 0 24 24' (valor por defecto)
        
        
        // ========================================
        // EXTRAER CONTENIDO INTERNO DEL SVG
        // ========================================
        
        const innerContent = content
            .replace(/<svg[^>]*>/, '')  // Quitar etiqueta <svg> de apertura
            .replace(/<\/svg>/, '')      // Quitar etiqueta </svg> de cierre
            .trim();                     // Quitar espacios al inicio y final
        
        // ↑ ¿Qué hace "replace"?
        // Reemplaza texto que coincide con un patrón
        //
        // TRANSFORMACIÓN PASO A PASO:
        //
        // ORIGINAL:
        // `<svg xmlns="..." width="20" height="20" viewBox="0 0 20 20">
        //     <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor"/>
        // </svg>`
        //
        // DESPUÉS DE .replace(/<svg[^>]*>/, ''):
        // `
        //     <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor"/>
        // </svg>`
        //
        // DESPUÉS DE .replace(/<\/svg>/, ''):
        // `
        //     <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor"/>
        // `
        //
        // DESPUÉS DE .trim():
        // `<path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor"/>`
        
        
        // ========================================
        // CREAR ID DEL ICONO
        // ========================================
        
        const iconId = file.replace('.svg', '-icon');
        // ↑ Quita la extensión .svg y agrega -icon
        //
        // EJEMPLOS:
        // 'filter.svg' → 'filter-icon'
        // 'close.svg'  → 'close-icon'
        // 'trash.svg'  → 'trash-icon'
        
        
        // ========================================
        // CREAR EL SYMBOL
        // ========================================
        
        const symbol = `
    <!-- ${file} -->
    <symbol id="${iconId}" viewBox="${viewBox}">
        ${innerContent}
    </symbol>`;
        
        // ↑ Template literal (plantilla de texto)
        // Sustituye las variables ${...} por sus valores
        //
        // EJEMPLO DE RESULTADO (filter.svg):
        // `
        //     <!-- filter.svg -->
        //     <symbol id="filter-icon" viewBox="0 0 20 20">
        //         <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor"/>
        //     </symbol>
        // `
        
        
        // ========================================
        // GUARDAR EN EL ARRAY
        // ========================================
        
        symbols.push(symbol);
        // ↑ Agrega el symbol al array
        //
        // DESPUÉS DE PROCESAR 3 ARCHIVOS:
        // symbols = [
        //     '<symbol id="filter-icon">...</symbol>',
        //     '<symbol id="close-icon">...</symbol>',
        //     '<symbol id="trash-icon">...</symbol>'
        // ]
        
        
        // ========================================
        // MOSTRAR PROGRESO EN LA CONSOLA
        // ========================================
        
        console.log(`✅ Procesado: ${file} → #${iconId}`);
        // ↑ Muestra en la terminal qué archivo se procesó
        //
        // SALIDA EN LA CONSOLA:
        // ✅ Procesado: filter.svg → #filter-icon
        // ✅ Procesado: close.svg → #close-icon
        // ✅ Procesado: trash.svg → #trash-icon
    }
});


// ============================================
// CREAR EL ARCHIVO SPRITE COMPLETO
// ============================================

const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${symbols.join('\n')}
</svg>`;

// ↑ ¿Qué hace "join"?
// Une todos los elementos del array con el separador indicado
//
// EJEMPLO:
// symbols = ['<symbol id="filter-icon">...</symbol>', '<symbol id="close-icon">...</symbol>']
// symbols.join('\n') =
// `<symbol id="filter-icon">...</symbol>
// <symbol id="close-icon">...</symbol>`
//
// RESULTADO FINAL:
// spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
//     <!-- filter.svg -->
//     <symbol id="filter-icon" viewBox="0 0 20 20">
//         <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor"/>
//     </symbol>
//     <!-- close.svg -->
//     <symbol id="close-icon" viewBox="0 0 24 24">
//         <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
//         <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
//     </symbol>
// </svg>`


// ============================================
// GUARDAR EL ARCHIVO
// ============================================

fs.writeFileSync(outputFile, spriteContent);
// ↑ Escribe el contenido en un archivo
//
// Parámetros:
// - outputFile: './svg/icons.svg' (ruta del archivo)
// - spriteContent: el texto que se escribirá
//
// ACCIÓN:
// Crea (o sobrescribe) el archivo './svg/icons.svg'
// con todo el contenido del sprite


// ============================================
// MOSTRAR RESULTADO FINAL
// ============================================

console.log(`\n🎉 Sprite creado: ${outputFile}`);
console.log(`📦 Total de iconos: ${symbols.length}`);

// ↑ Muestra un resumen en la consola
//
// SALIDA:
// 🎉 Sprite creado: ./svg/icons.svg
// 📦 Total de iconos: 4
```

---

## 📊 EJEMPLO COMPLETO DE TRANSFORMACIÓN

### **ANTES (Archivos individuales):**

**Archivo: `svg/filter.svg`**
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor" stroke-width="2"/>
</svg>
```

**Archivo: `svg/close.svg`**
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
</svg>
```

**Archivo: `svg/trash.svg`**
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path d="M3 5h14M8 5V3h4v2M5 5v12h6" stroke="currentColor" stroke-width="2"/>
</svg>
```

---

### **DESPUÉS (Archivo combinado):**

**Archivo: `svg/icons.svg`**
```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">

    <!-- filter.svg -->
    <symbol id="filter-icon" viewBox="0 0 20 20">
        <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <!-- close.svg -->
    <symbol id="close-icon" viewBox="0 0 24 24">
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <!-- trash.svg -->
    <symbol id="trash-icon" viewBox="0 0 20 20">
        <path d="M3 5h14M8 5V3h4v2M5 5v12h6" stroke="currentColor" stroke-width="2"/>
    </symbol>

</svg>
```

---

## 🔄 FLUJO VISUAL DEL PROCESO

```
PASO 1: LEER CARPETA
┌─────────────────────────┐
│ fs.readdirSync('./svg') │
└───────────┬─────────────┘
            │
            ▼
['filter.svg', 'close.svg', 'trash.svg']


PASO 2: PROCESAR CADA ARCHIVO
┌──────────────────────────────────────────────────┐
│ ITERACIÓN 1: filter.svg                          │
│ ┌──────────────────────────────────────────────┐ │
│ │ 1. Leer contenido                            │ │
│ │ 2. Extraer viewBox: "0 0 20 20"             │ │
│ │ 3. Extraer contenido: <path d="..."/>       │ │
│ │ 4. Crear ID: "filter-icon"                  │ │
│ │ 5. Crear <symbol id="filter-icon">...</symbol>│ │
│ └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
            │
            ▼
symbols = ['<symbol id="filter-icon">...</symbol>']

┌──────────────────────────────────────────────────┐
│ ITERACIÓN 2: close.svg                           │
│ ... mismo proceso ...                            │
└──────────────────────────────────────────────────┘
            │
            ▼
symbols = [
    '<symbol id="filter-icon">...</symbol>',
    '<symbol id="close-icon">...</symbol>'
]

┌──────────────────────────────────────────────────┐
│ ITERACIÓN 3: trash.svg                           │
│ ... mismo proceso ...                            │
└──────────────────────────────────────────────────┘
            │
            ▼
symbols = [
    '<symbol id="filter-icon">...</symbol>',
    '<symbol id="close-icon">...</symbol>',
    '<symbol id="trash-icon">...</symbol>'
]


PASO 3: UNIR TODOS LOS SYMBOLS
┌────────────────────────────┐
│ symbols.join('\n')         │
└──────────┬─────────────────┘
           │
           ▼
`<symbol id="filter-icon">...</symbol>
<symbol id="close-icon">...</symbol>
<symbol id="trash-icon">...</symbol>`


PASO 4: ENVOLVER EN <SVG>
┌────────────────────────────────────────┐
│ <svg style="display: none;">           │
│   <symbol id="filter-icon">...</symbol>│
│   <symbol id="close-icon">...</symbol> │
│   <symbol id="trash-icon">...</symbol> │
│ </svg>                                 │
└────────────────────────────────────────┘


PASO 5: GUARDAR EN ARCHIVO
┌──────────────────────────────────┐
│ fs.writeFileSync(                │
│   './svg/icons.svg',             │
│   contenido                      │
│ )                                │
└──────────────────────────────────┘
           │
           ▼
    ✅ Archivo creado:
    ./svg/icons.svg
```

---

## 🎯 CONCEPTOS CLAVE EXPLICADOS

### **1. require() vs import**

```javascript
// Node.js (CommonJS)
const fs = require('fs');

// JavaScript moderno (ES6 Modules)
import fs from 'fs';
```

Son equivalentes, pero `require()` es el sistema antiguo de Node.js.

---

### **2. Sync vs Async**

```javascript
// SÍNCRONO (Sync): Espera a terminar
const files = fs.readdirSync('./svg');
console.log('Esto se ejecuta DESPUÉS de leer');

// ASÍNCRONO (Async): No espera
fs.readdir('./svg', (err, files) => {
    console.log('Esto se ejecuta DESPUÉS');
});
console.log('Esto se ejecuta ANTES (no espera)');
```

**Sync** bloquea la ejecución hasta terminar.  
**Async** no bloquea, continúa ejecutando.

---

### **3. Expresiones Regulares**

```javascript
const text = 'viewBox="0 0 20 20"';
const pattern = /viewBox="([^"]+)"/;
const match = text.match(pattern);

// Resultado:
// match[0] = 'viewBox="0 0 20 20"'  ← Coincidencia completa
// match[1] = '0 0 20 20'            ← Grupo capturado
```

**Partes del patrón:**
- `/` ... `/` = Delimitadores
- `viewBox="` = Texto literal
- `(` ... `)` = Grupo de captura
- `[^"]+` = Cualquier carácter excepto `"`, una o más veces
- `"` = Comilla de cierre

---

### **4. Template Literals**

```javascript
const nombre = 'Juan';
const edad = 25;

// Forma antigua:
const mensaje1 = 'Hola, ' + nombre + '. Tienes ' + edad + ' años.';

// Forma moderna:
const mensaje2 = `Hola, ${nombre}. Tienes ${edad} años.`;
```

---

### **5. Array.join()**

```javascript
const items = ['manzana', 'pera', 'uva'];

items.join(', ')  // 'manzana, pera, uva'
items.join(' - ') // 'manzana - pera - uva'
items.join('\n')  // 'manzana
                  //  pera
                  //  uva'
```

---

## 📝 SALIDA EN LA CONSOLA

Cuando ejecutas el script:

```bash
$ node create-sprite.js

✅ Procesado: filter.svg → #filter-icon
✅ Procesado: close.svg → #close-icon
✅ Procesado: trash.svg → #trash-icon
✅ Procesado: search.svg → #search-icon

🎉 Sprite creado: ./svg/icons.svg
📦 Total de iconos: 4
```

---

## 🎓 RESUMEN FINAL

**El script hace 5 cosas:**

1. **Lee** todos los archivos de `./svg/`
2. **Filtra** solo los archivos `.svg` (excepto `icons.svg`)
3. **Extrae** el contenido interno de cada SVG
4. **Convierte** cada SVG en un `<symbol>` con ID único
5. **Crea** el archivo `icons.svg` con todos los symbols combinados

**Ventajas:**
- ✅ Automatiza el proceso
- ✅ No tienes que copiar/pegar manualmente
- ✅ Mantiene comentarios indicando el archivo original
- ✅ Genera IDs consistentes (nombre-icon)

---

## 💡 USO POSTERIOR

Una vez creado `icons.svg`, lo usas así en tu HTML:

```html
<!-- Incluir sprite -->
<object data="svg/icons.svg" type="image/svg+xml" style="display: none;"></object>

<!-- Usar iconos -->
<svg width="20" height="20">
    <use href="svg/icons.svg#filter-icon"></use>
</svg>
```

O inline:

```html
<!-- Copiar el contenido de icons.svg aquí -->
<svg style="display: none;">
    <symbol id="filter-icon">...</symbol>
    <symbol id="close-icon">...</symbol>
</svg>

<!-- Usar iconos -->
<svg width="20" height="20">
    <use href="#filter-icon"></use>
</svg>
```
