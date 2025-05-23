<script setup>
import { RouterLink } from 'vue-router'
import GuessEscene from '../assets/MiniGames/GuessEscene.webp'
import ChallengeWeek from '../assets/MiniGames/ChallengeWeek.webp'
import MovieRandom from '../assets/MiniGames/MovieRandom.webp'
import QuizzMovies from '../assets/MiniGames/QuizzMovies.webp'

</script>

<template>
    <div class="min-h-screen px-6 py-10 space-y-12">
        <h1 class="text-5xl font-bold text-center text-white pt-10">Minijuegos</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            <!-- Card -->
            <RouterLink to="/minijuegos/retoSemanal" class="max-w-[250px] w-full">
                <div
                    class="bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                    <div class="aspect-[9/16] w-full">
                        <img :src="ChallengeWeek" alt="Reto Semanal" class="w-full h-full object-cover" />
                    </div>
                    <h2 class="text-xl font-semibold text-gray-700 text-center py-3">Reto Semanal</h2>
                </div>
            </RouterLink>

            <RouterLink to="/minijuegos/retoAleatorio" class="max-w-[250px] w-full">
                <div
                    class="bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                    <div class="aspect-[9/16] w-full">
                        <img :src="MovieRandom" alt="Película Aleatoria" class="w-full h-full object-cover" />
                    </div>
                    <h2 class="text-xl font-semibold text-gray-700 text-center py-3">Película Aleatoria</h2>
                </div>
            </RouterLink>

            <RouterLink to="/minijuegos/listaquizz" class="max-w-[250px] w-full">
                <div
                    class="bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                    <div class="aspect-[9/16] w-full">
                        <img :src="QuizzMovies" alt="Quizz" class="w-full h-full object-cover" />
                    </div>
                    <h2 class="text-xl font-semibold text-gray-700 text-center py-3">Quizz</h2>
                </div>
            </RouterLink>

            <RouterLink to="/minijuegos/adivinaEscena" class="max-w-[250px] w-full">
                <div
                    class="bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                    <div class="aspect-[9/16] w-full">
                        <img :src="GuessEscene" alt="Adivina el Escenario" class="w-full h-full object-cover" />
                    </div>
                    <h2 class="text-xl font-semibold text-gray-700 text-center py-3">Adivina el Trailer</h2>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>