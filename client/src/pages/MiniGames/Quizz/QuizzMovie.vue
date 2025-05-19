<script setup>
import { ref, onMounted } from 'vue'
import { useQuiz } from '../../../composables/useQuiz.js'
import { useRouter } from 'vue-router'

const quizzes = ref([])
const { startQuiz } = useQuiz()
const router = useRouter()
const backgroundStyles = [
    { class: 'bg-purple-700', overlay: 'rgba(139, 92, 246, 0.85)' },
    { class: 'bg-pink-700', overlay: 'rgba(219, 39, 119, 0.85)' },
    { class: 'bg-blue-700', overlay: 'rgba(59, 130, 246, 0.85)' },
    { class: 'bg-green-700', overlay: 'rgba(72, 255, 136, 0.85)' },
    { class: 'bg-red-700', overlay: 'rgba(255, 59, 59, 0.85)' },
]

onMounted(async () => {
    const res = await fetch('/data/quizzes.json')
    const data = await res.json()
    quizzes.value = data.quizzes
})

function handleStart(quiz) {
    startQuiz(quiz)
    router.push('/minijuegos/quizzlist/quizz')
}
</script>

<template>
    <div class="min-h-screen px-6 py-10 bg-gradient-to-b space-y-12">
        <h1 class="text-5xl font-bold text-center text-white pt-10">Quizz Movie</h1>

        <div class="relative pt-10">
            <div class="quiz-container flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-8">
                <div v-for="(quiz, index) in quizzes" :key="quiz.category"
                    class="quiz-card relative rounded-xl overflow-hidden text-white shadow-lg flex flex-col">
                    
                    <div class="absolute inset-0 bg-cover bg-center blur-sm scale-110 opacity-50"
                        :style="{ backgroundImage: `url(${quiz.image})` }"></div>

                    
                    <div class="absolute inset-0"
                        :style="{ backgroundColor: backgroundStyles[index % backgroundStyles.length].overlay }"></div>

                    
                    <div class="relative z-10 p-4 flex flex-col h-full justify-between">
                        <div class="flex items-center space-x-2 mb-4">
                            <img src="../../../assets/Logo.png" class="w-12 h-12" />
                            <span class="font-semibold text-sm">JaMovies</span>
                        </div>

                        <!-- Imagen con badge -->
                        <div class="relative rounded-lg overflow-hidden border-2 border-white">
                            <img :src="quiz.image" class="w-full h-40 object-cover" />
                        </div>

                        <div class="mt-4 space-y-2">
                            <h2 class="text-xl font-bold leading-snug">{{ quiz.category }}</h2>
                            <p class="text-sm opacity-90">{{ quiz.description }}</p>
                        </div>

                        <!-- Botón y métricas -->
                        <div class="mt-6">
                            <button @click="handleStart(quiz)" class="w-full flex items-center justify-center border border-white py-2 rounded-full hover:bg-white hover:text-purple-700 transition">
                                PLAY NOW
                                <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M12.293 3.293a1 1 0 011.414 0L18 7.586a2 2 0 010 2.828l-4.293 4.293a1 1 0 01-1.414-1.414L15.586 10H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.quiz-card {
    min-width: 320px;
    width: 350px;
    height: 550px;
}
</style>
