<script setup>
import challenges from '@/Data/ChallengesWeek.json'

function getCurrentWeekNumber() {
    const today = new Date()
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

const currentWeek = getCurrentWeekNumber()
const reto = challenges[(currentWeek - 1) % challenges.length]
</script>

<template>
    <div class="flex justify-center items-center min-h-screen px-4">
        <div class="relative bg-white rounded-2xl max-w-xl w-full" style="height: 180px;">
            <div v-for="n in 2" :key="n" class="absolute bg-gray-200 rounded-2xl shadow-sm" :style="{
                top: `${-n * 10}px`,
                width: '100%',
                height: '180px',
                zIndex: 1,
                transform: `scale(${1 - n * 0.03})`,
                opacity: 0.6
            }"></div>

            <div class="relative flex p-4 bg-white rounded-2xl shadow-md" style="height: 225px; z-index: 10;">
                <div class="flex-1">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">{{ reto.titulo }}</h2>
                    <p class="text-gray-600">{{ reto.descripcion }}</p>
                </div>
                <img :src="`/images/${reto.imagen}`" alt="Imagen del reto"
                    class="w-28 h-28 object-cover rounded-lg ml-4" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>