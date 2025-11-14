<template>
    <div class="container mx-auto max-w-7xl p-4 my-8">

        <!-- Botón para Volver (útil para la navegación) -->
        <RouterLink to="/" class="inline-flex items-center text-primary hover:text-primary-dark mb-4 group">
            <svg class="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
            </svg>
            Volver a productos
        </RouterLink>

        <!-- Contenedor Principal del Producto -->
        <div v-if="producto" class="bg-gray-100 shadow-xl rounded-xl overflow-hidden">
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
                    <div class="flex flex-col my-4 gap-2">
                        <span
                            class="text-4xl font-light text-primary ">{{ producto.precios.individual.toLocaleString('es-AR',
                                { style: 'currency', currency: 'ARS' })
                            }}</span>
                        <span class="text-md font-light text-gray-500">A partir de 3 unidades:{{
                            producto.precios.mayorista.toLocaleString('es-AR',
                                { style: 'currency', currency: 'ARS' })
                            }}</span>
                    </div>

                    <!-- Descripción -->
                    <p class="text-gray-700 leading-relaxed mb-6">{{ producto.descripcion }}</p>

                    <!-- Especificaciones Técnicas -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-3">Especificaciones</h3>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                            <span><strong>RAM:</strong> {{ producto.especificaciones.ram }}</span>
                            <span><strong>Almacenamiento:</strong> {{ producto.especificaciones.almacenamiento }}</span>
                            <span><strong>Chip:</strong> {{ producto.especificaciones.sim }}</span>
                            <span><strong>Conectividad:</strong> {{ producto.especificaciones.conectividad }}</span>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="flex flex-col sm:flex-row gap-4">


                        <button @click.prevent="sendWhatsAppMessage"
                            class="z-10 relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-black shadow-sm hover:bg-[#128C7E] transition-colors">
                            <IconBrandWhatsapp />
                            <span>Chat en WhatsApp</span>
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
import { IconBrandWhatsapp } from '@tabler/icons-vue'


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

/**
 * Formatea el precio a moneda local (ARS - Peso Argentino).
 */


const formatearPrecio = (precio) => {
    if (!precio || typeof precio !== 'number') {
        return '$ 0,00'
    }
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, // Opcional: si no quieres centavos
        maximumFractionDigits: 0  // Opcional: si no quieres centavos
    }).format(precio)
}

/**
 * Construye la ruta a la imagen.
 * Asume que las imágenes están en 'public/images/'.
 */


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

function onImageError(event) {
    event.target.src = `https://placehold.co/600x600/e2e8f0/adb5bd?text=Imagen+no+disponible`
}
const companyNumber = import.meta.env.VITE_WHATSAPP_NUMBER
const sendWhatsAppMessage = () => {
    if (!companyNumber) {
        console.error('⚠️ No se configuró el número de WhatsApp en .env')
        alert('Error: No se configuró el número de WhatsApp de la empresa.')
        return
    }

    const message = `Hola! Me interesa el producto ${props.producto.nombre}, cuyo precio es $${props.producto.precios.individual.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}. Podrían darme más información?`
    const url = `https://wa.me/${companyNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
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