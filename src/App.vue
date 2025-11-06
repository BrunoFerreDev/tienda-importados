<template>
    <div class="bg-background-light font-display text-gray-800">
        <Header />
        <Carousel v-if="route.name === 'Home'"/>
        <main class="mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1" >
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Carousel from './components/Carousel.vue'
import { useRoute } from 'vue-router'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>
