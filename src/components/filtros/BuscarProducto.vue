<template>
  <!-- 1. Contenedor 'relative' para anclar el dropdown -->
  <div class="relative max-w-sm w-full">

    <!-- Tu HTML de Buscador con v-model y eventos -->
    <div class="flex">
      <label class="flex flex-col w-full h-[45px]">
        <div class="flex w-full items-stretch rounded-lg">
          <div class="text-gray-500 flex bg-gray-100 items-center justify-center pl-3 rounded-l-lg">
            <!-- Asumo que este es un componente que ya tienes -->
            <!-- <IconSearch /> -->
            <!-- Si no, usa un SVG simple -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchTerm" @input="handleSearch" @blur="handleBlur"
            class="form-input flex-1 h-[45px] rounded-r-lg text-gray-800 focus:outline-none focus:ring-0 border-none bg-gray-100 placeholder:text-gray-500 px-3 text-lg"
            placeholder="Buscar productos..." autocomplete="off" />
        </div>
      </label>
    </div>

    <!-- 2. Lista de Resultados Desplegable -->
    <div v-if="searchResults.length > 0"
      class="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden max-h-96 overflow-y-auto">
      <ul>
        <li v-for="producto in searchResults" :key="producto.id">

          <!-- 3. RouterLink para redirigir al detalle -->
          <RouterLink :to="'/detalle/' + producto.id" @click="handleResultClick"
            class="flex items-center p-3 hover:bg-gray-100 transition-colors duration-150 w-full text-left">

            <!-- Miniatura de la imagen -->
            <img :src="getImageUrl(producto)" class="w-10 h-10 object-cover rounded-md mr-3 flex-shrink-0"
              @error="onImageError" />

            <div class="flex flex-col overflow-hidden">
              <span class="text-sm font-medium text-gray-900 truncate">{{ producto.nombre }}</span>
              <span class="text-sm text-gray-500">{{ producto.marca }}</span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
// Asumo que IconSearch es un componente que ya tienes, si no, puedes borrar esta línea


// --- Estado Reactivo ---
const searchTerm = ref('')
const allProducts = ref([])
const searchResults = ref([])
const debounceTimer = ref(null)

/**
 * 1. Carga todos los productos desde el JSON *una sola vez*
 * cuando el componente se monta.
 */
onMounted(async () => {
  try {
    const response = await fetch('/data/data.json')
    if (!response.ok) throw new Error('No se pudo cargar productos.json')
    allProducts.value = await response.json()
    console.log(allProducts.value)
  } catch (error) {
    console.error("Error cargando productos para búsqueda:", error)
  }
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
 * 2. Se llama en *cada* tecla presionada en el input.
 * Usa un 'debounce' para esperar 300ms antes de buscar
 * y no sobrecargar la app.
 */
function handleSearch() {
  // Limpia el timer anterior
  clearTimeout(debounceTimer.value)

  // Inicia un nuevo timer
  debounceTimer.value = setTimeout(() => {
    // Si la búsqueda está vacía o es muy corta, limpia los resultados
    if (searchTerm.value.length < 2) {
      searchResults.value = []
      return
    }

    const query = searchTerm.value.toLowerCase()

    // Filtra la lista de productos cacheados
    searchResults.value = allProducts.value
      .filter(p =>
        p.nombre.toLowerCase().includes(query) ||
        p.marca.toLowerCase().includes(query)
      )
      .slice(0, 5) // Muestra solo los primeros 5 resultados
  }, 300) // Espera 300ms después de la última tecla
}

/**
 * 3. Se llama cuando el usuario hace clic en un resultado.
 * Limpia el input y la lista de resultados.
 */
function handleResultClick() {
  searchTerm.value = ''
  searchResults.value = []
}

/**
 * 4. Se llama cuando el input pierde el foco (clic afuera).
 * Espera un momento para permitir que el clic en el RouterLink se registre.
 */
function handleBlur() {
  setTimeout(() => {
    searchResults.value = []
  }, 200) // 200ms de espera
}

/**
 * 5. Muestra un placeholder si la imagen del producto no se encuentra.
 */
function onImageError(event) {
  event.target.src = 'https://placehold.co/40x40/e2e8f0/adb5bd?text=N/A'
}
</script>