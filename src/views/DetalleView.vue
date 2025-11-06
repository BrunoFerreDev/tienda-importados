<script setup>
import ProductoDetalle from '../components/productos/ProductoDetalle.vue';
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'

const route = useRoute()
const id = route.params.id

const producto = ref({})

async function fetchProducts() {
    try {
        // 1. Llama al archivo JSON en la carpeta 'public'
        const response = await fetch('/data/productos.json');

        // 2. Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todosLosProductos = await response.json();
        producto.value = todosLosProductos.find(p => p.id === id);

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        // Opcional: podrías establecer un estado de error para mostrar en la UI
        producto.value = []; // Asigna un array vacío en caso de error
    }
}

onMounted(() => {
    fetchProducts()
})

</script>

<template>
    <ProductoDetalle :producto="producto" />
</template>