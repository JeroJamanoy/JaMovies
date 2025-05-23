<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pelicula = ref(null)
const cast = ref([])
const reviews = ref([])
const director = ref('')

const API_KEY = '16b18fb9f9858390f815f73f41d9dfe8'

onMounted(async () => {
    const id = route.params.id
    const [detailsRes, creditsRes, reviewsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=es-ES`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=es-ES`)
    ])

    pelicula.value = await detailsRes.json()

    const credits = await creditsRes.json()
    cast.value = credits.cast

    const directorData = credits.crew.find(person => person.job === 'Director')
    director.value = directorData ? directorData.name : 'Desconocido'

    reviews.value = await reviewsRes.json()
})

const saveMovie = () => {
  const id = route.params.id
  let saved = JSON.parse(localStorage.getItem('savedMovies') || '[]')

  if (!saved.includes(id)) {
    saved.push(id)
    localStorage.setItem('savedMovies', JSON.stringify(saved))
    alert('Película guardada para ver después.')
  } else {
    alert('Esta película ya está guardada.')
  }
}
</script>


<template>
    <div v-if="pelicula">
        <div class="relative h-[80vh] w-full bg-cover bg-center flex items-end"
            :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + pelicula.backdrop_path + ')' }">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div class="relative z-10 w-full text-white px-6 py-8 text-center bg-opacity-50">
                <h1 class="text-3xl md:text-5xl font-bold">{{ pelicula.title }}</h1>
                <p class="text-lg text-gray-300 mt-2 max-w-xl mx-auto">
                    {{ pelicula.tagline || 'Una historia que no querrás perderte.' }}
                </p>
                <button
                    @click="saveMovie"
                    class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                    Guardar para ver después
                </button>
            </div>

            
        </div>

        <!-- Parte inferior: info + botones -->
        <div class="bg-black text-white p-8 md:p-16 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12">
            <!-- Información -->
            <div>
                <div class="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <p class="font-bold">Descripción</p>
                    <p class="mt-4 text-gray-300">{{ pelicula.overview }}</p>
                </div>
                <div class="bg-gray-900 p-6 rounded-lg shadow-lg mt-6">
                    <p class="font-semibold text-lg mb-2">Reparto principal</p>
                    <ul class="mt-2 text-gray-300 list-disc list-inside space-y-1">
                        <li v-for="actor in cast.slice(0, 5)" :key="actor.id">
                            {{ actor.name }} como <span class="italic">{{ actor.character }}</span>
                        </li>
                    </ul>
                </div>
                <div class="bg-gray-900 p-6 rounded-lg shadow-lg mt-6">
                    <p class="font-semibold text-lg mb-2">Reseñas</p>
                    <div class="mt-2 text-gray-300 list-disc list-inside space-y-1 grid grid-cols-2 gap-4">
                        <div v-for="review in reviews.results.slice(0, 3)" :key="review.id" class="bg-gray-800 p-5 rounded-lg shadow-lg">
                            <h3>{{  review.author }}</h3>
                            <p class="text-gray-400 text-sm">{{ review.created_at }}</p>
                            <p class="text-xs">{{ review.content }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Critica 2 -->
            <div class="bg-gray-900 flex flex-col md:items-end gap-4 p-6 rounded-lg shadow-lg">
                <h3 class="font-bold">Fecha de estreno: </h3>
                <p> {{ pelicula.release_date }}</p>
                <h3 class="font-bold">Duración: </h3>
                <p> {{ pelicula.runtime }} minutos</p>
                <h3 class="font-bold">Géneros: </h3>
                <div class="mt-2 text-gray-300 flex flex-wrap justify-end gap-2">
                    <div v-for="genre in pelicula.genres" :key="genre.id" class="bg-gray-800 px-3 py-1 rounded-lg shadow-lg text-sm">
                        {{ genre.name }}
                    </div>
                </div>
                <h3 class="font-bold">Director</h3>
                <p>{{ director }}</p>
                <h3 class="font-bold">Lenguaje Original</h3>
                <div class="mt-2 text-gray-300 list-disc list-inside space-y-">
                    <div v-for="language in pelicula.spoken_languages.slice(0, 3)" :key="language.id">
                        <p>{{ language.name}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
