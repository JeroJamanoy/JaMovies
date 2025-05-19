import { ref, computed } from 'vue'
const currentQuiz = ref(null)
const currentQuestionIndex = ref(0)
const score = ref(0)
const showResult = ref(false)

export function useQuiz() {

const startQuiz = quiz => {
    currentQuiz.value = quiz
    currentQuestionIndex.value = 0
    score.value = 0
    showResult.value = false
}

const selectAnswer = answer => {
    if (answer === currentQuestion.value.correct) {
    score.value++
    }

    if (currentQuestionIndex.value + 1 < currentQuiz.value.questions.length) {
    currentQuestionIndex.value++
    } else {
    showResult.value = true
    }
}

const resetQuiz = () => {
    currentQuiz.value = null
    currentQuestionIndex.value = 0
    score.value = 0
    showResult.value = false
}

const currentQuestion = computed(() => currentQuiz.value?.questions[currentQuestionIndex.value])

return {
    currentQuiz,
    currentQuestionIndex,
    currentQuestion,
    score,
    showResult,
    startQuiz,
    selectAnswer,
    resetQuiz,
}
}
