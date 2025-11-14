<template>
    <section class="w-full relative overflow-hidden bg-background-dark py-16 md:py-24 lg:py-32 h-[600px]">
        <div class="absolute inset-0 w-full bg-no-repeat bg-cover bg-center md:hidden"
            style="background-image: url('/banner-movil.webp');">
        </div>

        <div class="absolute inset-0 w-full bg-no-repeat bg-cover bg-center hidden md:block"
            style="background-image: url('/banner.webp');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
        <div class="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 mt-12 tracking-tight">¡Celulares importados, calidad
                garantizada!
            </h1>
            <p class="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">Recibí tu smartphone nuevo sin pagar de más.
            </p>
            <p class="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 underline mt-3">Envíos a toda Argentina</p>
            <a class="flex flex-col items-center bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors mt-8 text-lg"
                href="#" @click.prevent="scrollToCatalog">Explorar Catálogo
                <IconArrowDown class="ml-2" />
            </a>
        </div>
    </section>
</template>
<script setup>
import { IconArrowDown } from "@tabler/icons-vue";
const scrollToCatalog = () => {
    const catalogSection = document.getElementById("catalog");
    if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth" });
    }
};
</script>
