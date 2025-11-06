<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center space-x-2 mt-8">
    
    <button
      @click="onClickPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
      Anterior
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="onClickPage(page)"
      :class="[
        'px-4 py-2 rounded-lg border text-sm font-medium',
        page === currentPage 
          ? 'border-primary bg-primary text-white' // Estilo de página activa
          : 'border-gray-300 bg-white hover:bg-gray-50' // Estilo de página inactiva
      ]">
      {{ page }}
    </button>

    <button
      @click="onClickPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
      Siguiente
    </button>
  </nav>
</template>

<script setup>
// --- Props ---
// Recibe los datos del padre (HomeView)
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  }
});

// --- Emits ---
// Define el evento que este componente "emitirá" hacia el padre
const emits = defineEmits(['page-changed']);

// --- Métodos ---
/**
 * Emite el evento 'page-changed' con el número de página al que se hizo clic.
 * El componente padre (HomeView) estará escuchando este evento.
 */
function onClickPage(page) {
  // Validación para no ir a páginas inválidas
  if (page < 1 || page > props.totalPages) {
    return;
  }
  emits('page-changed', page);
}
</script>

<style scoped>
/* (Opcional) Define tu color 'primary' si no lo has hecho en Tailwind config */
.border-primary { border-color: #3b82f6; } /* Azul de ejemplo */
.bg-primary { background-color: #3b82f6; } /* Azul de ejemplo */
</style>