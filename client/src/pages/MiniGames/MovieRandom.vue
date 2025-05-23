<script setup>
import { ref } from 'vue'

const flipped = ref(false)
const movie = ref(null)
const API_KEY = '16b18fb9f9858390f815f73f41d9dfe8'

async function flipCard() {
    if (!flipped.value) {
        // Cargar película aleatoria antes de voltear
        const randomPage = Math.floor(Math.random() * 50) + 1
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${randomPage}`)
        const data = await res.json()
        const results = data.results
        movie.value = results[Math.floor(Math.random() * results.length)]
    }

    flipped.value = !flipped.value
}
</script>

<template>
    <div class="perspective w-64 h-200 mx-auto my-8 cursor-pointer pt-50 pb-50" @click="flipCard">
        <div :class="['transition-transform duration-700 w-full h-full relative', flipped ? 'rotate-y-180' : '']"
            style="transform-style: preserve-3d;">

            <!-- Frente -->
            <div
                class="absolute w-full h-full bg-gray-800 rounded-lg text-white flex items-center justify-center text-6xl font-bold backface-hidden">
                ?
            </div>

            <!-- Reverso -->
            <div
                class="absolute w-full h-full bg-gray-900 rounded-lg text-white p-4 flex flex-col items-center justify-center backface-hidden transform rotate-y-180">
                <img v-if="movie" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="poster"
                    class="w-full h-64 object-cover rounded-lg mb-4" />
                <router-link v-if="movie" :to="`/movies/${movie.id}`"
                    class="text-center text-lg font-semibold text-white hover:underline">
                    {{ movie.title }}
                </router-link>
            </div>

        </div>
    </div>
</template>



<style scoped>
.perspective {
    perspective: 1000px;
}

.rotate-y-180 {
    transform: rotateY(180deg);
}

.backface-hidden {
    backface-visibility: hidden;
}
</style>
