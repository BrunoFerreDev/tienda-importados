<script setup>
import { IconSearch } from '@tabler/icons-vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <header
        class="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-10 sticky top-0 z-50 bg-white">
        <!-- Sección izquierda: logo + enlaces -->
        <div class="flex items-center gap-4">
            <img src="/logo.jpeg" alt="Logo TechStore" class="w-44 h-24 object-contain" />
            <nav class="flex items-center gap-3 text-gray-600 text-lg font-medium">
                <RouterLink to="/" class="hover:text-primary">Inicio</RouterLink>
                <RouterLink to="/informacion" class="hover:text-primary">Información</RouterLink>
            </nav>
        </div>

        <!-- Botón menú móvil -->
        <button id="menu-toggle" class="flex items-center justify-center h-10 w-10 text-primary md:hidden">
            <span class="material-symbols-outlined text-3xl">menu</span>
        </button>

        <!-- Sección derecha (visible en pantallas grandes) -->
        <div class="hidden md:flex items-center gap-4">
            <!-- Buscador -->
            <div class="flex max-w-sm">
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
            </div>

            <!-- Íconos -->
            <div class="flex items-center gap-2">
                <button
                    class="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                        <path
                            d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                </button>
                <button
                    class="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        <path d="M16.5 7.5v.01" />
                    </svg>
                </button>
            </div>
        </div>
    </header>
</template>