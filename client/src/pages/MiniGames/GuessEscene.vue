<template>
    <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h2 class="text-2xl md:text-3xl font-bold mb-6">Adivina el Trailer</h2>

        <!-- Video -->
        <div v-if="videoKey" class="w-full max-w-xl aspect-video mb-6">
            <iframe class="w-full h-full rounded-lg"
                :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1`" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="verificarRespuesta" class="w-full max-w-md space-y-4 text-center">
            <input v-model="respuesta" type="text" placeholder="¿Cuál es la película?"
                class="w-full p-3 rounded-lg text-black" :disabled="resultado !== ''" />
            <button type="submit" class="bg-gray-800 hover:bg-gray-700 transition p-3 w-full rounded-lg font-bold"
                :disabled="resultado !== ''">
                Verificar
            </button>
        </form>

        <!-- Resultado -->
        <div v-if="resultado" class="mt-6 text-xl font-semibold"
            :class="resultado === '¡Correcto!' ? 'text-green-400' : 'text-red-400'">
            {{ resultado }}
        </div>

        <router-link v-if="resultado" to="/minijuegos" class="mt-4 inline-block text-gray-400 hover:underline">
            Volver a minijuegos
        </router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_KEY = '16b18fb9f9858390f815f73f41d9dfe8'

const videoKey = ref('')
const pelicula = ref(null)
const respuesta = ref('')
const resultado = ref('')

onMounted(async () => {
    // Intenta hasta que encuentre una película con video
    let movieWithVideo = null
    while (!movieWithVideo) {
        const page = Math.floor(Math.random() * 50) + 1
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`)
        const movies = await res.json()
        const randomMovie = movies.results[Math.floor(Math.random() * movies.results.length)]

        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${API_KEY}&language=es-ES`)
        const videoData = await videoRes.json()

        const trailer = videoData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
        if (trailer) {
            videoKey.value = trailer.key
            pelicula.value = randomMovie
            break
        }
    }
})

function verificarRespuesta() {
    const input = respuesta.value.trim().toLowerCase()
    const titulo = pelicula.value?.title.toLowerCase()

    if (input === titulo) {
        resultado.value = '¡Correcto!'
    } else {
        resultado.value = 'Intenta de nuevo'
    }
}
</script>
