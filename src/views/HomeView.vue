<template>
    <div class="container mx-auto p-4">
        <div class="flex flex-col lg:flex-row gap-8">

            <aside class="lg:w-1/4">
                <FiltrosContainer @update:filters="updateFilters" :marcas="marcasDisponibles"
                    :categorias="categoriasDisponibles" />
            </aside>

            <main class="lg:w-3/4">
                <div v-if="paginatedProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductoCard v-for="producto in paginatedProducts" :key="producto.id" :producto="producto" />
                </div>
                <div v-else class="text-center text-gray-500 py-12">
                    <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                </div>

                <Paginacion v-if="totalPages > 1" :total-pages="totalPages" :current-page="currentPage"
                    @page-changed="changePage" />
            </main>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductoCard from '@/components/productos/ProductoCard.vue';
import FiltrosContainer from '@/components/filtros/FiltrosContainer.vue';
import Paginacion from '@/components/filtros/Paginacion.vue';
// Ajusta la ruta si es necesario

// --- 1. ESTADO PRINCIPAL ---
const products = ref([])      // Lista completa de todos los productos
const currentPage = ref(1)
const itemsPerPage = 6     // Define cuántos productos por página

// --- 2. ESTADO DE FILTROS ---
// ¡IMPORTANTE! Debe inicializarse con la misma estructura
// que el estado 'reactive' en FiltrosContainer.vue
const filters = ref({
    sort: 'featured',
    categoria: [],
    marca: []
})

// --- 3. LIFECYCLE ---
onMounted(() => {
    fetchProducts()
})

// --- 4. MÉTODOS ---

// Simulación de carga de productos
async function fetchProducts() {
    try {
        // 1. Llama al archivo JSON en la carpeta 'public'
        const response = await fetch('/data/productos.json');

        // 2. Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Convierte la respuesta a JSON y la asigna al ref
        products.value = await response.json();

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        // Opcional: podrías establecer un estado de error para mostrar en la UI
        products.value = []; // Asigna un array vacío en caso de error
    }
}

/**
 * Recibe los filtros actualizados desde el componente hijo
 */
function updateFilters(newFilters) {
    filters.value = newFilters
    currentPage.value = 1 // ¡CRÍTICO! Resetea a la página 1 cada vez que se filtra
    // 👇 AÑADE ESTA LÍNEA
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Cambia la página actual (viene de Paginacion.vue)
 */
function changePage(page) {
    currentPage.value = page
    // 👇 AÑADE ESTA LÍNEA
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 5. PROPIEDADES COMPUTADAS ---

/**
 * (Opcional pero recomendado)
 * Genera listas dinámicas de marcas y categorías para pasar a los filtros.
 */
const marcasDisponibles = computed(() => {
    const marcas = new Set(products.value.map(p => p.marca));
    return Array.from(marcas).map(marca => ({ label: marca, value: marca }));
});

const categoriasDisponibles = computed(() => {
    const otrasCategorias = ['Accesorios', 'Electrodomésticos'];
    const categorias = new Set(products.value.map(p => p.categoria));
    return Array.from(categorias).map(cat => ({ label: cat, value: cat })).concat(otrasCategorias.map(cat => ({ label: cat, value: cat })));
});


/**
 * 🐞 SOLUCIÓN FILTROS:
 * Filtra la lista completa de productos basándose en los filtros seleccionados.
 */
const filteredProducts = computed(() => {
    // Convierte los filtros a minúsculas una vez
    const filterCategorias = filters.value.categoria.map(c => c.toLowerCase());
    const filterMarcas = filters.value.marca.map(m => m.toLowerCase());

    return products.value.filter(producto => {
        // Comprueba categoría
        const prodCategoria = (producto.categoria || '').toLowerCase();
        const matchCategoria = !filterCategorias.length ||
            filterCategorias.includes(prodCategoria);

        // Comprueba marca
        const prodMarca = (producto.marca || '').toLowerCase();
        const matchMarca = !filterMarcas.length ||
            filterMarcas.includes(prodMarca);

        // Si tu FiltrosContainer.vue solo muestra marcas, 'filterCategorias'
        // siempre será un array vacío [], por lo que 'matchCategoria' siempre será 'true'.
        // Esto funciona perfectamente.
        return matchCategoria && matchMarca;
    });
});

/**
 * Calcula el número total de páginas basado en los productos FILTRADOS
 */
const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

/**
 * 🐞 SOLUCIÓN ORDEN/PAGINACIÓN:
 * Ordena y luego corta la lista de productos filtrados para la página actual.
 */
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // 1. Copia los productos filtrados
    let productosOrdenados = [...filteredProducts.value];

    // 2. ORDENA la lista COMPLETA primero
    if (filters.value.sort === 'precio-asc') {
        productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (filters.value.sort === 'precio-desc') {
        productosOrdenados.sort((a, b) => b.precio - a.precio);
    }
    // 'featured' no necesita ordenación, usa el orden por defecto

    // 3. CORTA (slice) la página después de ordenar
    return productosOrdenados.slice(start, end);
});

</script>