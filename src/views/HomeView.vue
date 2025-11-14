<template>
    <div class="container mx-auto p-4">
        <Loader v-if="loading" />
        <div v-else class="flex flex-col lg:flex-row gap-8" style="scroll-margin-top: 180px;" id="catalog"
            ref="productListContainerRef">
            <aside class="lg:w-1/4">
                <FiltrosContainer @update:filters="updateFilters" :marcas="marcasDisponibles" />
            </aside>

            <main class="lg:w-3/4">
                <h3 class=" text-2xl font-bold mb-4">Lista de Productos</h3>
                <div v-if="paginatedProducts.length > 0" class="products">
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
import Loader from '@/components/Loader.vue';
// Ajusta la ruta si es necesario
const productListContainerRef = ref(null)
// --- 1. ESTADO PRINCIPAL ---
const products = ref([])      // Lista completa de todos los productos
const currentPage = ref(1)
const itemsPerPage = 10     // Define cuántos productos por página
const loading = ref(true)
// --- 2. ESTADO DE FILTROS ---
// ¡IMPORTANTE! Debe inicializarse con la misma estructura
// que el estado 'reactive' en FiltrosContainer.vue
const filters = ref({
    sort: 'featured',
    marca: []
})

// (Opcional pero recomendado: crea una función reutilizable)
function scrollToProductList() {
    // Comprueba si el elemento ya existe en el DOM
    if (productListContainerRef.value) {
        productListContainerRef.value.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Esto alinea la parte superior del <main> con la parte superior de la vista
        });
    }
}
// --- 3. LIFECYCLE ---
onMounted(() => {
    fetchProducts()
})

// --- 4. MÉTODOS ---

// Simulación de carga de productos
async function fetchProducts() {

    try {
        // 1. Llama al archivo JSON en la carpeta 'public'
        const response = await fetch('/data/data.json');

        // 2. Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Convierte la respuesta a JSON y la asigna al ref
        products.value = await response.json();
        products.value.sort(() => Math.random() - 0.5);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        // Opcional: podrías establecer un estado de error para mostrar en la UI
        products.value = []; // Asigna un array vacío en caso de error
    } finally {
        loading.value = false
    }
}

/**
 * Recibe los filtros actualizados desde el componente hijo
 */
function updateFilters(newFilters) {
    filters.value = newFilters
    currentPage.value = 1 // ¡CRÍTICO! Resetea a la página 1 cada vez que se filtra
    // 👇 AÑADE ESTA LÍNEA
    scrollToProductList()
}

/**
 * Cambia la página actual (viene de Paginacion.vue)
 */
function changePage(page) {
    currentPage.value = page
    // 👇 AÑADE ESTA LÍNEA
    scrollToProductList()
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


const filteredProducts = computed(() => {
    // Convierte los filtros a minúsculas una vez
    const filterMarcas = filters.value.marca.map(m => m.toLowerCase());

    return products.value.filter(producto => {

        // Comprueba marca
        const prodMarca = (producto.marca || '').toLowerCase();
        const matchMarca = !filterMarcas.length ||
            filterMarcas.includes(prodMarca);

        return matchMarca;
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
        productosOrdenados.sort((a, b) => a.precios.individual - b.precios.individual);
    } else if (filters.value.sort === 'precio-desc') {
        productosOrdenados.sort((a, b) => b.precios.individual - a.precios.individual);
    }
    // 'featured' no necesita ordenación, usa el orden por defecto

    // 3. CORTA (slice) la página después de ordenar
    return productosOrdenados.slice(start, end);
});

</script>
<style scoped>
.products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    place-items: center;
}
</style>