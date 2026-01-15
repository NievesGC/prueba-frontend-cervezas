// ============================================
// ARCHIVO PRINCIPAL - main.js
// Inicializa la aplicación cuando la página carga
// ============================================

// Variable global para guardar todos los productos
let allProducts = [];

// Variable global para la instancia del filtro
let productFilter;

// ============================================
// FUNCIÓN: Cargar productos desde products.json
// ============================================
async function loadProducts() {
  try {
    // Hacer petición al archivo JSON
    const response = await fetch('products.json');
    
    // Convertir la respuesta a JSON
    const products = await response.json();
    
    // Guardar los productos en la variable global
    allProducts = products;
    
    // Renderizar los productos en la página
    renderProducts(products);
    
    console.log('✅ Productos cargados:', products.length);
    
  } catch (error) {
    // Si hay error, mostrarlo en la consola
    console.error('❌ Error al cargar productos:', error);
    
    // Mostrar mensaje al usuario
    showError('No se pudieron cargar los productos. Por favor, recarga la página.');
  }
}

// ============================================
// FUNCIÓN: Renderizar productos en el DOM
// ============================================
function renderProducts(products) {
  // 1. Obtener la plantilla de Handlebars del HTML
  const templateSource = document.getElementById('product-template').innerHTML;
  
  // 2. Compilar la plantilla
  const template = Handlebars.compile(templateSource);
  
  // 3. Generar el HTML con los datos
  const html = template({ products: products });
  
  // 4. Insertar el HTML en el contenedor
  document.getElementById('productsGrid').innerHTML = html;
  
  console.log('✅ Productos renderizados:', products.length);
}

// ============================================
// FUNCIÓN: Mostrar mensaje de error
// ============================================
function showError(message) {
  const container = document.getElementById('productsGrid');
  container.innerHTML = `
    <div style="
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: #e74c3c;
      font-size: 18px;
    ">
      ${message}
    </div>
  `;
}

// ============================================
// FUNCIÓN: Inicializar la aplicación
// ============================================
function initApp() {
  console.log('🚀 Inicializando aplicación...');
  
  // 1. Cargar los productos
  loadProducts();
  
  // 2. Inicializar el sistema de filtros
  productFilter = new ProductFilter();
  
  console.log('✅ Aplicación inicializada');
}

// ============================================
// EVENTO: Esperar a que el DOM esté listo
// ============================================
document.addEventListener('DOMContentLoaded', initApp);