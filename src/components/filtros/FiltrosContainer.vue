<template>
  <div
    class="w-full lg:w-64 lg:sticky lg:top-26 z-50 bg-white rounded-xl p-4 shadow-md border border-gray-100 text-sm mb-4 lg:mb-0">

    <h3 class="text-lg font-semibold mb-4 border-b pb-2">Filtros</h3>

    <div class="space-y-4">

      <div>
        <label for="sort-select" class="block text-sm font-medium mb-1">Ordenar:</label>
        <select id="sort-select"
          class="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          v-model="filters.sort">
          <option v-for="option in sort" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- <details class="flex flex-col group" open>
        <summary class="flex cursor-pointer list-none items-center justify-between gap-6 font-medium">
          Categorías
        </summary>
        <div class="flex flex-col space-y-1 p-2 gap-2 mt-2">
          <label v-for="cat in categorias" :key="cat.value" class="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" :value="cat.value" v-model="filters.categoria" />
            <span>{{ cat.label }}</span>
          </label>
        </div>
      </details> -->

      <details class="flex flex-col group" open>
        <summary class="flex cursor-pointer list-none items-center justify-between gap-6 font-medium">
          Marca
        </summary>
        <div class="flex flex-col space-y-1 p-2 gap-2 mt-2">
          <label v-for="brand in marcas" :key="brand.value" class="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" :value="brand.value" v-model="filters.marca" />
            <span>{{ brand.label }}</span>
          </label>
        </div>
      </details>

      <div class="pt-4 border-t border-gray-200">
        <button @click="resetFilters"
          class="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary">
          Limpiar Filtros
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

// --- Props (No hay cambios) ---
const props = defineProps({
  sort: {
    type: Array,
    default: () => [
      { label: 'Aleatorio', value: 'featured' },
      { label: 'Precio: Bajo a Alto', value: 'precio-asc' },
      { label: 'Precio: Alto a Bajo', value: 'precio-desc' },
    ]
  },
  marcas: {
    type: Array,
    default: () => [
      { label: 'Samsung', value: 'Samsung' },
      { label: 'Motorola', value: 'Motorola' },
    ]
  },
})

// --- Emits (No hay cambios) ---
const emits = defineEmits(['update:filters'])

// --- Estado reactivo (No hay cambios) ---
const filters = reactive({
  sort: 'featured',
  marca: [],
})

// --- Función de reseteo (No hay cambios) ---
function resetFilters() {
  filters.sort = 'featured'
  filters.marca = []
}

// --- Watch (No hay cambios) ---
watch(filters, (newFilters) => {
  emits('update:filters', newFilters)
}, { deep: true })
</script>

<style scoped>
/* Estilos (No hay cambios) */
summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: "▾";
  float: right;
  font-size: 0.9em;
  transition: transform 0.2s ease-in-out;
}

details[open] summary::after {
  transform: rotate(180deg);
  content: "▴";
}
</style>