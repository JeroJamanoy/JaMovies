<template>
  <div class="p-6 text-white bg-black min-h-screen pt-20">
    <h1 class="text-3xl font-bold mb-6 center">Películas guardadas para ver después</h1>
    <div v-if="peliculas.length === 0" class="text-gray-400">No tienes películas guardadas.</div>
    <div class="grid md:grid-cols-3 gap-6" v-else>
      <div
        v-for="peli in peliculas"
        :key="peli.id"
        class="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-40 min-w-[10rem]"
      >
        <img :src="'https://image.tmdb.org/t/p/w500/' + peli.poster_path" :alt="peli.title" class="w-full h-auto" />
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ peli.title }}</h2>
          <p class="text-sm text-gray-400 mt-1">{{ peli.release_date }}</p>
          <router-link :to="`/movie/${peli.id}`" class="text-white-400 hover:underline text-sm block mt-2">Ver más</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const peliculas = ref([])
const API_KEY = '16b18fb9f9858390f815f73f41d9dfe8'

onMounted(async () => {
  const saved = JSON.parse(localStorage.getItem('savedMovies') || '[]')
  const fetches = saved.map(id =>
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`).then(res => res.json())
  )
  peliculas.value = await Promise.all(fetches)
})
</script>
