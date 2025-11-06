<template>
  <div class="flex min-h-[70vh] flex-col items-center justify-center text-center py-12 px-4">
    
    <h1 class="text-9xl font-black text-gray-300">404</h1>
    
    <p class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Página no encontrada
    </p>
    <p class="mt-2 text-base text-gray-500">
      Lo sentimos, no pudimos encontrar la página que estás buscando.
    </p>

    <p class="mt-8 text-lg text-gray-700">
      Serás redirigido a la página de inicio en 
      <span class="font-bold text-primary">{{ countdown }}</span> 
      segundos...
    </p>

    <div class="mt-6">
      <RouterLink 
        to="/" 
        class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">
        Ir al inicio ahora
      </RouterLink>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const countdown = ref(3) // Inicia el contador en 3
let timerId = null         // Para el setTimeout de la redirección
let intervalId = null    // Para el setInterval del contador

onMounted(() => {
  // --- Lógica del Contador (Visual) ---
  // Inicia un intervalo que se ejecuta cada segundo
  intervalId = setInterval(() => {
    countdown.value-- // Reduce el contador
    if (countdown.value <= 0) {
      clearInterval(intervalId) // Detiene el intervalo
    }
  }, 1000) // 1000ms = 1 segundo

  // --- Lógica de la Redirección ---
  // Inicia un temporizador que se ejecuta una vez después de 3 segundos
  timerId = setTimeout(() => {
    router.push('/') // Redirige al Home
  }, 3000) // 3000ms = 3 segundos
})

onUnmounted(() => {
  // Buena práctica: Limpia los temporizadores si el usuario
  // navega a otro lado antes de que terminen.
  clearTimeout(timerId)
  clearInterval(intervalId)
})
</script>

<style scoped>
/* Opcional: Define tus colores primarios si no están en Tailwind config */
.text-primary { color: #3b82f6; } /* Azul de ejemplo */
.bg-primary { background-color: #3b82f6; }
.hover\:bg-primary-dark:hover { background-color: #2563eb; }
.focus\:ring-primary-dark:focus { --tw-ring-color: #2563eb; }
</style>