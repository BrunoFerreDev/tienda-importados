<script setup>
import ProductoDetalle from '../components/productos/ProductoDetalle.vue';
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue' // 'computed' no se usaba
import ProductoCard from '../components/productos/ProductoCard.vue';
import Loader from '../components/Loader.vue';
const route = useRoute()
const productoActual = ref(null) // Iniciar con null es mejor que {}
const productosRelacionados = ref([])
const loading = ref(true)
/**
 * Carga el producto principal Y los relacionados
 * basado en un ID específico, con una sola llamada a la API.
 */
async function cargarDatosDelProducto(id) {
    // Resetea los valores para mostrar "Cargando..."
    productoActual.value = null
    productosRelacionados.value = []

    try {
        const response = await fetch('/data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todosLosProductos = await response.json();

        // 1. Encuentra el producto actual
        productoActual.value = todosLosProductos.find(p => p.id === id);

        // 2. Encuentra los productos relacionados (en la misma llamada)
        productosRelacionados.value = todosLosProductos
            .filter(p => p.id !== id) // Usa el 'id' actual
            .slice(0, 5); // Toma 5 relacionados

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        productoActual.value = null; // Asigna null en caso de error
        productosRelacionados.value = [];
    }

    // 3. Haz scroll al inicio al final de la carga
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loading.value = false
}

// --- Lógica de Carga (onMounted y watch) ---

// 1. Carga inicial
// Llama a la función cuando el componente se monta por primera vez
onMounted(() => {
    cargarDatosDelProducto(route.params.id)
})

// 2. ¡LA SOLUCIÓN!
// Vigila si el 'id' en la URL cambia
watch(
    () => route.params.id, // Vigila el parámetro 'id'
    (nuevoId, viejoId) => {
        // Si el ID cambia (ej: de un producto relacionado a otro),
        // vuelve a llamar a la función de carga con el nuevo ID.
        if (nuevoId && nuevoId !== viejoId) {
            cargarDatosDelProducto(nuevoId)
        }
    }
)

</script>

<template>
    <div class="container mx-auto flex-1">
        <Loader v-if="loading" />
        <ProductoDetalle :producto="productoActual" v-else-if="productoActual" />
        <p v-else>No se encontró el producto</p>
        <h3 class="text-2xl font-bold mb-4 mt-8">Productos Relacionados</h3>
        <div v-if="productosRelacionados.length > 0" class="related">
            <ProductoCard v-for="producto in productosRelacionados" :key="producto.id" :producto="producto" />
        </div>
    </div>
</template>
<style scoped>
.related {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
    place-content: center;
}
</style>