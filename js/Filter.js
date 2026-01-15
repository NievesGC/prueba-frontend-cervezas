// ============================================
// CLASE: ProductFilter
// Maneja la lógica de filtrado de productos
// ============================================

class ProductFilter {
  // ============================================
  // CONSTRUCTOR: Inicializa la clase
  // ============================================
  constructor() {
    // Array para guardar los filtros seleccionados
    this.selectedFilters = [];
    
    // Referencias a elementos del DOM
    this.elements = {
      modal: document.getElementById('filterModal'),
      modalOverlay: document.getElementById('modalOverlay'),
      filterButton: document.getElementById('filterButton'),
      closeModalButton: document.getElementById('closeModal'),
      applyFiltersButton: document.getElementById('applyFilters'),
      clearFiltersButton: document.getElementById('clearFilters'),
      filterBadge: document.getElementById('filterBadge'),
      filterForm: document.getElementById('filterForm'),
      productsGrid: document.getElementById('productsGrid')
    };
    
    // Inicializar eventos
    this.initEvents();
    
    // Cargar filtros guardados (si existen)
    //this.loadFiltersFromStorage();
    
    console.log('✅ Sistema de filtros inicializado');
  }
  
  // ============================================
  // MÉTODO: Inicializar eventos
  // ============================================
  initEvents() {
    // Abrir modal al hacer clic en el botón "Filtrar"
    this.elements.filterButton.addEventListener('click', () => {
      this.openModal();
    });
    
    // Cerrar modal con el botón X
    this.elements.closeModalButton.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Cerrar modal al hacer clic en el overlay
    this.elements.modalOverlay.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Aplicar filtros
    this.elements.applyFiltersButton.addEventListener('click', () => {
      this.applyFilters();
    });
    
    // Limpiar filtros
    this.elements.clearFiltersButton.addEventListener('click', () => {
      this.clearFilters();
    });
    
    // Detectar cambios en los checkboxes
    const checkboxes = this.elements.filterForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateSelectedFilters();
      });
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.elements.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
  
  // ============================================
  // MÉTODO: Abrir modal
  // ============================================
  openModal() {
    this.elements.modal.classList.add('active');
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    
    console.log('🪟 Modal abierto');
  }
  
  // ============================================
  // MÉTODO: Cerrar modal
  // ============================================
  closeModal() {
    this.elements.modal.classList.remove('active');
    // Restaurar scroll del body
    document.body.style.overflow = '';
    
    console.log('🪟 Modal cerrado');
  }
  
  // ============================================
  // MÉTODO: Actualizar filtros seleccionados
  // ============================================
  updateSelectedFilters() {
    // Obtener todos los checkboxes marcados
    const checkboxes = this.elements.filterForm.querySelectorAll('input[type="checkbox"]:checked');
    
    // Extraer los valores (IDs de categoría)
    this.selectedFilters = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));
    
    // Actualizar badge con el número de filtros
    this.updateBadge();
    
    // Habilitar/deshabilitar botón de limpiar
    this.elements.clearFiltersButton.disabled = this.selectedFilters.length === 0;
    
    console.log('🔍 Filtros seleccionados:', this.selectedFilters);
  }
  
  // ============================================
  // MÉTODO: Actualizar badge del botón filtrar
  // ============================================
  updateBadge() {
    const count = this.selectedFilters.length;
    
    if (count > 0) {
      // Mostrar badge con el número
      this.elements.filterBadge.textContent = count;
      this.elements.filterBadge.style.display = 'inline-flex';
    } else {
      // Ocultar badge
      this.elements.filterBadge.style.display = 'none';
    }
  }
  
  // ============================================
  // MÉTODO: Aplicar filtros
  // ============================================
  applyFilters() {
    // Cerrar modal
    this.closeModal();
    
    // Filtrar productos
    let filteredProducts;
    
    if (this.selectedFilters.length === 0) {
      // Si no hay filtros, mostrar todos
      filteredProducts = allProducts;
    } else {
      // Filtrar productos según categorías seleccionadas
      filteredProducts = allProducts.filter(product => {
        return this.selectedFilters.includes(product.category);
      });
    }
    
    // Renderizar productos filtrados
    renderProducts(filteredProducts);
    
    // Guardar filtros en localStorage
    //this.saveFiltersToStorage();
    
    console.log(`✅ Filtros aplicados. Productos mostrados: ${filteredProducts.length}`);
  }
  
  // ============================================
  // MÉTODO: Limpiar filtros
  // ============================================
  clearFilters() {
    // Desmarcar todos los checkboxes
    const checkboxes = this.elements.filterForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Vaciar array de filtros seleccionados
    this.selectedFilters = [];
    
    // Actualizar badge
    this.updateBadge();
    
    // Deshabilitar botón de limpiar
    this.elements.clearFiltersButton.disabled = true;
    
    // Mostrar todos los productos
    renderProducts(allProducts);
    
    // Limpiar localStorage
    this.clearFiltersFromStorage();
    
    console.log('🗑️ Filtros limpiados');
  }
  
  // ============================================
  // MÉTODO BONUS: Guardar filtros en localStorage
  // ============================================
  /* saveFiltersToStorage() {
    try {
      // Convertir array a JSON y guardarlo
      localStorage.setItem('selectedFilters', JSON.stringify(this.selectedFilters));
      console.log('💾 Filtros guardados en localStorage');
    } catch (error) {
      console.error('❌ Error al guardar filtros:', error);
    }
  } */
  
  // ============================================
  // MÉTODO BONUS: Cargar filtros desde localStorage
  // ============================================
  /* loadFiltersFromStorage() {
    try {
      // Obtener filtros guardados
      const savedFilters = localStorage.getItem('selectedFilters');
      
      if (savedFilters) {
        // Convertir de JSON a array
        this.selectedFilters = JSON.parse(savedFilters);
        
        // Marcar checkboxes correspondientes
        const checkboxes = this.elements.filterForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          const value = parseInt(checkbox.value);
          if (this.selectedFilters.includes(value)) {
            checkbox.checked = true;
          }
        });
        
        // Actualizar badge
        this.updateBadge();
        
        // Habilitar botón limpiar si hay filtros
        this.elements.clearFiltersButton.disabled = this.selectedFilters.length === 0;
        
        // Aplicar filtros automáticamente
        if (this.selectedFilters.length > 0) {
          const filteredProducts = allProducts.filter(product => {
            return this.selectedFilters.includes(product.category);
          });
          renderProducts(filteredProducts);
        }
        
        console.log('📂 Filtros cargados desde localStorage:', this.selectedFilters);
      }
    } catch (error) {
      console.error('❌ Error al cargar filtros:', error);
    }
  } */
  
  // ============================================
  // MÉTODO BONUS: Limpiar localStorage
  // ============================================
  /* clearFiltersFromStorage() {
    try {
      localStorage.removeItem('selectedFilters');
      console.log('🗑️ Filtros eliminados de localStorage');
    } catch (error) {
      console.error('❌ Error al limpiar filtros:', error);
    }
  } */
}