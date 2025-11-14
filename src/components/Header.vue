<script setup>
import { RouterLink } from 'vue-router';
import BuscarProducto from './filtros/BuscarProducto.vue';
import { IconBrandWhatsapp } from '@tabler/icons-vue';
const companyNumber = import.meta.env.VITE_WHATSAPP_NUMBER
const sendWhatsAppMessage = () => {
    if (!companyNumber) {
        console.error('⚠️ No se configuró el número de WhatsApp en')
        alert('Error: No se configuró el número de WhatsApp de la empresa.')
        return
    }
    const url = `https://wa.me/${companyNumber}`
    window.open(url, '_blank')
}
</script>

<template>
    <header class="flex items-center justify-between border-b border-gray-200 px-4 lg:px-10 sticky top-0 z-50 bg-white">
        <!-- Sección izquierda: logo + enlaces -->
        <div class="flex items-center gap-2 flex-wrap ">
            <img src="/logo.jpeg" alt="Logo TechStore" class="w-44 h-24 object-contain" />
            <nav class="flex items-center gap-3 text-gray-600 text-lg font-medium">
                <RouterLink to="/" class="hover:text-primary">Inicio</RouterLink>
                <RouterLink to="/informacion" class="hover:text-primary">Información</RouterLink>
            </nav>
            <div class="md:hidden mb-2 flex justify-center w-full">
                <BuscarProducto />
            </div>
        </div>
        <!-- Sección derecha (visible en pantallas grandes) -->
        <div class="hidden md:flex items-center gap-4">
            <!-- <div class="flex max-w-sm">
                <label class="flex flex-col w-full h-[45px]">
                    <div class="flex w-full items-stretch rounded-lg">
                        <div class="text-gray-500 flex bg-gray-100 items-center justify-center pl-3 rounded-l-lg">
                            <IconSearch />
                        </div>
                        <input
                            class="form-input flex-1 h-[45px] rounded-r-lg text-gray-800 focus:outline-none focus:ring-0 border-none bg-gray-100 placeholder:text-gray-500 px-3 text-lg"
                            placeholder="Buscar productos..." />
                    </div>
                </label>
            </div> -->
            <BuscarProducto />
            <!-- Íconos -->
            <div class="hidden lg:flex items-center gap-2">
                <button @click.prevent="sendWhatsAppMessage" 
                    class="cursor-pointer flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition">
                    <IconBrandWhatsapp />
                </button>

            </div>
        </div>
    </header>
</template>
