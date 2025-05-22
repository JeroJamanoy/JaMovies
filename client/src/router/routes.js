import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Forum from '../pages/Forum.vue'
import Minigames from '../pages/Minigames.vue'
import List from '../pages/List.vue'
import GuessEscene from '../pages/MiniGames/GuessEscene.vue'
import ChallengeWeek from '../pages/MiniGames/ChallengeWeek.vue'
import MovieRandom from '../pages/MiniGames/MovieRandom.vue'
import QuizzMovie from '../pages/MiniGames/Quizz/QuizzMovie.vue'
import QuizzGame from '../pages/MiniGames/Quizz/QuizzGame.vue'
import Login from '../components/Login.vue'
import Register from '../pages/Register.vue'



const routes = [
    { path: '/', component: Home },
    { path: '/foro', component: Forum },
    { path: '/minijuegos', component: Minigames },
    { path: '/listas', component: List },
    { path: '/minijuegos/adivinaEscena', component: GuessEscene },
    { path : '/minijuegos/retoSemanal', component: ChallengeWeek },
    { path : '/minijuegos/retoAleatorio', component: MovieRandom },
    { path : '/minijuegos/listaquizz', component: QuizzMovie },
    { path : '/minijuegos/quizzlist/quizz', component: QuizzGame},
    { path : '/login', component: Login},
    { path : '/Register', component: Register}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
