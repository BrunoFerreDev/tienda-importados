<template>
    <div class="container mx-auto max-w-5xl p-4 my-8">

        <!-- Botón para Volver (útil para la navegación) -->
        <a href="#" @click.prevent="goBack"
            class="inline-flex items-center text-primary hover:text-primary-dark mb-4 group">
            <svg class="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
            </svg>
            Volver a productos
        </a>

        <!-- Contenedor Principal del Producto -->
        <div v-if="producto" class="bg-white shadow-xl rounded-xl overflow-hidden">
            <div class="flex flex-col md:flex-row">

                <!-- Columna de la Imagen -->
                <div class="md:w-1/2 p-6">
                    <img :src="getImageUrl(producto)" :alt="producto.nombre"
                        class="w-full h-auto object-contain rounded-lg aspect-square" @error="onImageError">
                    <!-- NOTA: La imagen se busca en /images/MOT-001.webp. 
               Asegúrate de que tus imágenes estén en la carpeta 'public/images/' -->
                </div>

                <!-- Columna de Información -->
                <div class="md:w-1/2 p-6 flex flex-col justify-center">
                    <!-- Marca -->
                    <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider">{{ producto.marca
                        }}</span>

                    <!-- Nombre del Producto -->
                    <h1 class="text-3xl font-bold text-gray-900 my-2">{{ producto.nombre }}</h1>

                    <!-- Precio -->
                    <span class="text-4xl font-light text-primary my-4">{{ formattedPrice }}</span>

                    <!-- Descripción -->
                    <p class="text-gray-700 leading-relaxed mb-6">{{ producto.descripcion }}</p>

                    <!-- Especificaciones Técnicas -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-3">Especificaciones</h3>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                            <span><strong>RAM:</strong> {{ producto.ram }}</span>
                            <span><strong>Almacenamiento:</strong> {{ producto.almacenamiento }}</span>
                            <span><strong>Chip:</strong> {{ producto.chip }}</span>
                            <span><strong>Conectividad:</strong> {{ producto.conectividad }}</span>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="flex flex-col sm:flex-row gap-4">


                        <!-- Botón Agregar al Carrito -->
                        <button @click="handleAddToCart"
                            class="flex-1 bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-200">
                            Info via WhatsApp
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Estado de Carga -->
        <div v-else class="text-center py-20">
            <span class="text-lg text-gray-500">Cargando producto...</span>
            <!-- Aquí podrías poner un spinner -->
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- Props ---
// El componente espera un objeto 'producto'.
// El 'v-if="producto"' en el template se encarga de
// mostrar "Cargando..." si este prop es null o undefined.
const props = defineProps({
    producto: {
        type: Object,
        required: false, // Lo ponemos en false para mostrar el estado de carga
        default: null
    }
})

// --- Estado Interno ---

// --- Propiedades Computadas ---

/**
 * Formatea el precio a moneda local (ARS - Peso Argentino).
 */
const formattedPrice = computed(() => {
    if (!props.producto || typeof props.producto.precio !== 'number') {
        return '$ 0,00'
    }
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, // Opcional: si no quieres centavos
        maximumFractionDigits: 0  // Opcional: si no quieres centavos
    }).format(props.producto.precio)
})

/**
 * Construye la ruta a la imagen.
 * Asume que las imágenes están en 'public/images/'.
 */
const imagePath = computed(() => {
    if (props.producto) {
        // Asumimos que las imágenes están en /images/
        // Ej: /images/MOT-001.webp
        return `/images/${props.producto.imagen}`
    }
    // Devuelve una imagen placeholder si no hay producto
    return 'https://placehold.co/600x600/e2e8f0/adb5bd?text=Cargando'
})

function getImageUrl(producto) {
    try {
        return new URL(
            `../../assets/${producto.marca}/${producto.id}.webp`,
            import.meta.url
        ).href
    } catch {
        // Si la imagen no existe, muestra una genérica
        return new URL('../../assets/no-image.webp', import.meta.url).href
    }
}


/**
 * Maneja el error si la imagen no se encuentra y pone un placeholder.
 */
function onImageError(event) {
    event.target.src = `https://placehold.co/600x600/e2e8f0/adb5bd?text=Imagen+no+disponible`
}

/**
 * Navega a la página anterior.
 */
function goBack() {
    window.history.back()
}
</script>

<style scoped>
/* Define tus colores primarios si no están en la config de Tailwind */
.text-primary {
    color: #3b82f6;
}

/* Azul de ejemplo */
.bg-primary {
    background-color: #3b82f6;
}

.hover\:text-primary-dark:hover {
    color: #2563eb;
}

.hover\:bg-primary-dark:hover {
    background-color: #2563eb;
}
</style>