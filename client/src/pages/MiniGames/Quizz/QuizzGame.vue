<script setup>
import { useQuiz } from '@/composables/useQuiz'
import { useRouter } from 'vue-router'

const {
  currentQuiz,
  currentQuestion,
  currentQuestionIndex,
  selectAnswer,
  score,
  showResult,
  resetQuiz
} = useQuiz()

const router = useRouter()

function goBack() {
  resetQuiz()
  router.push('/minijuegos')
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center text-white px-6">
    <div v-if="!showResult" class="max-w-xl w-full space-y-6">
      <h2 class="text-2xl font-bold">{{ currentQuiz.title }}</h2>
      <p class="text-lg">{{ currentQuestion.question }}</p>

      <div class="grid gap-4">
        <button
          v-for="option in currentQuestion.options"
          :key="option"
          @click="selectAnswer(option)"
          class="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-green-400 transition"
        >
          {{ option }}
        </button>
      </div>

      <p class="text-sm text-white/70 mt-4">Pregunta {{ currentQuestionIndex + 1 }} / {{ currentQuiz.questions.length }}</p>
    </div>

    <div v-else class="text-center">
      <h2 class="text-3xl font-bold">¡Resultado!</h2>
      <p class="text-lg mt-4">Puntaje: {{ score }} / {{ currentQuiz.questions.length }}</p>
      <button @click="goBack" class="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-purple-300">
        Volver a Minijuegos
      </button>
    </div>
  </div>
</template>
