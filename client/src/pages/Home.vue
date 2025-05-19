<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const API_KEY = '16b18fb9f9858390f815f73f41d9dfe8'

const populares = ref([])
const cartelera = ref([])
const proximas = ref([])
const indiceActual = ref(0)
const filaPopulares = ref(null)
const filaCartelera = ref(null)
const filaProximas = ref(null)
let intervalo = null

const obtenerPeliculas = async (categoria, refPeliculas) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${categoria}?api_key=${API_KEY}&language=es-ES&page=1`)
        const data = await res.json()
        refPeliculas.value = data.results
    } catch (e) {
        console.error(`Error obteniendo ${categoria}:`, e)
    }
}

const precargarImagenes = (peliculas) => {
    peliculas.forEach(pelicula => {
        const img = new Image()
        img.src = `https://image.tmdb.org/t/p/original${pelicula.backdrop_path}`
    })
}

onMounted(() => {
    obtenerPeliculas('popular', populares).then(() => {
        precargarImagenes(populares.value)
    })
    obtenerPeliculas('now_playing', cartelera)
    obtenerPeliculas('upcoming', proximas)

    intervalo = setInterval(() => {
        if (populares.value.length > 0) {
            indiceActual.value = (indiceActual.value + 1) % populares.value.length
        }
    }, 5000)
})

onBeforeUnmount(() => {
    clearInterval(intervalo)
})

const siguiente = () => {
    if (populares.value.length > 0) {
        indiceActual.value = (indiceActual.value + 1) % populares.value.length
    }
}

const anterior = () => {
    if (populares.value.length > 0) {
        indiceActual.value = (indiceActual.value - 1 + populares.value.length) % populares.value.length
    }
}

function scrollIzquierda() {
    filaPopulares.value.scrollBy({
        left: -300,
        behavior: 'smooth'
    })
}

function scrollDerecha() {
    filaPopulares.value.scrollBy({
        left: 300,
        behavior: 'smooth'
    })
}

function scrollIzquierdaCartelera() {
    filaCartelera.value.scrollBy({
        left: -300,
        behavior: 'smooth'
    })
}

function scrollDerechaCartelera() {
    filaCartelera.value.scrollBy({
        left: 300,
        behavior: 'smooth'
    })
}

function scrollIzquierdaProximas() {
    filaProximas.value.scrollBy({
        left: -300,
        behavior: 'smooth'
    })
}

function scrollDerechaProximas() {
    filaProximas.value.scrollBy({
        left: 300,
        behavior: 'smooth'
    })
}
</script>



<template>
    <div class="bg-black text-white min-h-screen space-y-10">

        <!-- * Imagen Principal * -->
        <div v-if="populares.length"
            class="relative h-[80vh] w-full bg-cover bg-center flex items-end p-8 transition-all duration-500"
            :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${populares[indiceActual].backdrop_path})` }">

            <div class="bg-gradient-to-t from-black via-transparent w-full h-full absolute top-0 left-0"></div>
            <!-- Flechas -->
            <button @click="anterior"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 transition hover:bg-black">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdC1pY29uIGx1Y2lkZS1jaGV2cm9uLWxlZnQiPjxwYXRoIGQ9Im0xNSAxOC02LTYgNi02Ii8+PC9zdmc+"
                    alt="Anterior" class="w-5 h-5 transition hover:invert" />
            </button>

            <button @click="siguiente"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 transition hover:bg-black">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQtaWNvbiBsdWNpZGUtY2hldnJvbi1yaWdodCI+PHBhdGggZD0ibTkgMTggNi02LTYtNiIvPjwvc3ZnPg=="
                    alt="Anterior" class="w-5 h-5 transition hover:invert" />
            </button>

            <div class="relative z-10 max-w-2xl">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ populares[indiceActual].title }}</h1>
                <p class="text-sm md:text-base line-clamp-3">{{ populares[indiceActual].overview }}</p>
            </div>
        </div>


        <!-- * Imagen de Populares * -->
        <div class="space-y-8 px-4">
            <div>
                <h2 class="text-xl md:text-2xl font-semibold mb-2">Populares</h2>
                <div class="relative">
                    <!-- Botón Izquierda -->
                    <button @click="scrollIzquierda"
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-black transition">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdC1pY29uIGx1Y2lkZS1jaGV2cm9uLWxlZnQiPjxwYXRoIGQ9Im0xNSAxOC02LTYgNi02Ii8+PC9zdmc+"
                            class="w-4 h-4 transition hover:invert" />
                    </button>

                    <!-- Contenedor con scroll horizontal -->
                    <div ref="filaPopulares" class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8">
                        <div v-for="p in populares" :key="p.id"
                            class="w-40 min-w-[10rem] bg-gray-800 rounded-lg overflow-hidden shadow">
                            <img :src="`https://image.tmdb.org/t/p/w500${p.poster_path}`" alt="Póster" />
                            <div class="p-2">
                                <h3 class="text-sm font-semibold truncate">{{ p.title }}</h3>
                            </div>
                        </div>
                    </div>

                    <!-- Botón Derecha -->
                    <button @click="scrollDerecha"
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-black transition">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQtaWNvbiBsdWNpZGUtY2hldnJvbi1yaWdodCI+PHBhdGggZD0ibTkgMTggNi02LTYtNiIvPjwvc3ZnPg=="
                            class="w-4 h-4 transition hover:invert" />
                    </button>
                </div>
            </div>
        </div>


        <!-- * Imagenes de Cartelera * -->
        <div class="space-y-8 px-4">
            <div>
                <h2 class="text-xl md:text-2xl font-semibold mb-2">En cartelera</h2>

                <div class="relative">
                    <!-- Botón Izquierda -->
                    <button @click="scrollIzquierdaCartelera"
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-black transition">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdC1pY29uIGx1Y2lkZS1jaGV2cm9uLWxlZnQiPjxwYXRoIGQ9Im0xNSAxOC02LTYgNi02Ii8+PC9zdmc+"
                            class="w-4 h-4 transition hover:invert" />
                    </button>

                    <!-- Contenedor con scroll horizontal -->
                    <div ref="filaCartelera" class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8">
                        <div v-for="p in cartelera" :key="p.id"
                            class="w-40 min-w-[10rem] bg-gray-800 rounded-lg overflow-hidden shadow">
                            <img :src="`https://image.tmdb.org/t/p/w500${p.poster_path}`" alt="Póster" />
                            <div class="p-2">
                                <h3 class="text-sm font-semibold truncate">{{ p.title }}</h3>
                            </div>
                        </div>
                    </div>

                    <!-- Botón Derecha -->
                    <button @click="scrollDerechaCartelera"
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-black transition">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQtaWNvbiBsdWNpZGUtY2hldnJvbi1yaWdodCI+PHBhdGggZD0ibTkgMTggNi02LTYtNiIvPjwvc3ZnPg=="
                            class="w-4 h-4 transition hover:invert" />
                    </button>
                </div>
            </div>
        </div>

        <!-- * Imagen de Próximamente * -->
        <div class="space-y-8 px-4">
            <div>
                <h2 class="text-xl md:text-2xl font-semibold mb-2">Próximamente</h2>

                <div class="relative">
                    <!-- Botón Izquierda -->
                    <button @click="scrollIzquierdaProximas"
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-black transition">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdC1pY29uIGx1Y2lkZS1jaGV2cm9uLWxlZnQiPjxwYXRoIGQ9Im0xNSAxOC02LTYgNi02Ii8+PC9zdmc+"
                        class="w-4 h-4 transition hover:invert" />
                    </button>

                    <!-- Contenedor con scroll horizontal -->
                    <div ref="filaProximas" class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8">
                        <div v-for="p in proximas" :key="p.id"
                            class="w-40 min-w-[10rem] bg-gray-800 rounded-lg overflow-hidden shadow">
                            <img :src="`https://image.tmdb.org/t/p/w500${p.poster_path}`" alt="Póster" />
                            <div class="p-2">
                                <h3 class="text-sm font-semibold truncate">{{ p.title }}</h3>
                            </div>
                        </div>
                    </div>

                    <!-- Botón Derecha -->
                    <button @click="scrollDerechaProximas"
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-black transition">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQtaWNvbiBsdWNpZGUtY2hldnJvbi1yaWdodCI+PHBhdGggZD0ibTkgMTggNi02LTYtNiIvPjwvc3ZnPg=="
                        class="w-4 h-4 transition hover:invert" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
