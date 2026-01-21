# prueba-frontend-cervezas

Prueba técnica frontend - Sistema de filtros de productos

## Descripción

Este proyecto es una prueba técnica frontend desarrollada con el apoyo de inteligencia artificial (IA) para aprender y aplicar todas las tecnologías utilizadas en el repositorio. El objetivo principal es demostrar habilidades en el desarrollo de una aplicación web interactiva para un catálogo de cervezas, implementando un sistema de filtros dinámicos.

La aplicación permite a los usuarios explorar un catálogo de cervezas artesanales, aplicando filtros por tipo de cerveza (Rubia, Morena, Roja) a través de una interfaz modal intuitiva. Los productos se renderizan dinámicamente desde un archivo JSON, utilizando plantillas Handlebars para una experiencia fluida.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la página web.
- **CSS3 / SCSS**: Estilos responsivos y modulares, compilados desde Sass.
- **JavaScript (ES6+)**: Lógica de la aplicación, incluyendo clases y módulos.
- **Handlebars.js**: Motor de plantillas para renderizar productos dinámicamente.
- **Node.js**: Entorno de ejecución para scripts de construcción y desarrollo.
- **Sass**: Preprocesador CSS para estilos avanzados.
- **SVG Sprites**: Optimización de iconos mediante sprites SVG generados automáticamente.
- **Live Server**: Servidor de desarrollo para recarga automática durante el desarrollo.

## Estructura del Proyecto

```
cervezas/
├── index.html # Página principal de la aplicación
├── package.json # Configuración de dependencias y scripts de Node.js
├── products.json # Datos de los productos en formato JSON
├── README.md # Documentación del proyecto
│
├── css/
│ └── styles.css # Estilos compilados desde SCSS (generado automáticamente)
│
├── img/ # Imágenes de los productos (cervezas)
│
├── js/ # Scripts JavaScript
│ ├── main.js # Script principal - Inicialización de la aplicación
│ │ # - Carga de productos desde JSON
│ │ # - Renderizado dinámico con Handlebars
│ │ # - Integración con el sistema de filtros
│ │
│ ├── Filter.js # Clase ProductFilter - Lógica de filtrado
│ │ # - Gestión de eventos del modal
│ │ # - Aplicación de filtros dinámicos
│ │ # - Actualización de la interfaz
│ │ # - Gestión del badge de filtros activos
│ │
│ ├── create-sprite.js # Script Node.js - Generador de sprites SVG
│ │ # - Lee iconos individuales de la carpeta svg/
│ │ # - Combina en un único archivo sprite.svg
│ │ # - Automatiza la optimización de iconos
│ │
│ └── explicacion-sprite-svg.md # Documentación técnica de sprites SVG
│ # - Explicación de cómo funciona el sprite
│ # - Guía de uso en HTML
│
├── scss/ # Estilos SCSS (preprocesador CSS)
│ ├── styles.scss # Archivo principal que importa los parciales
│ ├── _reset.scss # Reset de estilos CSS por defecto
│ ├── _variables.scss # Variables globales (colores, tipografía, espacios)
│ ├── _base.scss # Estilos base y generales
│ ├── _header.scss # Estilos del encabezado y título
│ ├── _filter-bar.scss # Estilos de la barra de filtros
│ ├── _modal.scss # Estilos del modal y overlay
│ ├── _buttons.scss # Estilos de botones reutilizables
│ └── _products.scss # Estilos de las tarjetas de productos
│
└── svg/ # Iconos SVG individuales                    # Iconos SVG individuales
```

## Funcionalidad

- **Catálogo de Productos**: Muestra una cuadrícula de cervezas con imagen, nombre, descripción, grado de alcohol y precio.
- **Sistema de Filtros**: Modal interactivo que permite filtrar productos por tipo de cerveza. Incluye indicadores visuales para filtros activos y opción de limpiar filtros.
- **Interfaz Responsiva**: Diseño adaptable a diferentes tamaños de pantalla.
- **Renderizado Dinámico**: Los productos se cargan desde `products.json` y se renderizan usando Handlebars.
- **Sprites SVG**: Iconos optimizados en un sprite SVG para mejorar el rendimiento.

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/NievesGC/prueba-frontend-cervezas.git
   cd prueba-frontend-cervezas
   ```

2. **Instala las dependencias**:
   Asegúrate de tener Node.js instalado. Luego ejecuta:
   ```bash
   npm install
   ```

3. **Genera los sprites SVG** (opcional, si no están generados):
   ```bash
   npm run build:icons
   ```

4. **Compila los estilos SCSS** (opcional, si necesitas modificar estilos):
   ```bash
   npm run sass
   ```

## Ejecución

Para ejecutar la aplicación en modo desarrollo con recarga automática:

```bash
npm run dev
```

Esto iniciará un servidor local en `http://localhost:8080` (o el puerto disponible). Abre esta URL en tu navegador para ver la aplicación.

Para producción, simplemente abre `index.html` en un navegador web moderno que soporte ES6+.

## Scripts Disponibles

- `npm run sass`: Compila los archivos SCSS a CSS con watch mode.
- `npm run build:icons`: Genera el sprite SVG desde los iconos individuales.
- `npm run dev`: Inicia el servidor de desarrollo con live-server.

## Contribución

Este proyecto fue desarrollado como una prueba técnica con apoyo de IA para aprendizaje. 

## Autor

Nieves Gómez Carrasco
