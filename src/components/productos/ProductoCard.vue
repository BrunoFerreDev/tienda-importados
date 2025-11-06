<template>
    <div class=" group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white h-full">
        <div class="aspect-square bg-white">
            <img class="h-full w-full object-cover object-center p-4 group-hover:scale-105 transition-transform duration-300"
                data-alt="A sleek silver laptop open on a wooden desk." :src="getImageUrl(producto)" :alt="producto.nombre"/>
        </div>
        <div class="flex flex-1 flex-col p-4">
            <h3 class="text-base font-medium text-gray-900">
                <RouterLink :to="`/detalle/${producto.id}`">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    {{ producto.nombre }}
                </RouterLink>
            </h3>
            <p class="text-sm text-gray-500 mt-1">{{ producto.especificaciones.almacenamiento + ' | ' +
                producto.especificaciones.ram + ' | ' + producto.especificaciones.conectividad }}</p>
            <div class="flex flex-1 flex-col justify-end mt-4">
                <p class="text-lg font-bold text-gray-900">{{ formatearPrecio(producto.precios.individual) }}</p>
            </div>
        </div>
        <div class="p-4 pt-0">
            <button @click.prevent="sendWhatsAppMessage"
                class="z-10 relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-black shadow-sm hover:bg-[#128C7E] transition-colors">
                <IconBrandWhatsapp />
                <span>Chat en WhatsApp</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import { IconBrandWhatsapp } from '@tabler/icons-vue';

const props = defineProps({
    producto: {
        type: Object,
        required: true,
    },
})

// ✅ Construye la ruta de la imagen según la marca y nombre del archivo
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
const companyNumber = import.meta.env.VITE_WHATSAPP_NUMBER

const sendWhatsAppMessage = () => {
    if (!companyNumber) {
        console.error('⚠️ No se configuró el número de WhatsApp en .env')
        alert('Error: No se configuró el número de WhatsApp de la empresa.')
        return
    }

    const message = `Hola! Me interesa el producto ${props.producto.nombre}, cuyo precio es $${props.producto.precios.individual.toLocaleString()}. Podrían darme más información?`
    const url = `https://wa.me/${companyNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
}
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
</script>