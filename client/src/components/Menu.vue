<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
    <nav class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <!-- Logo con enlace al inicio -->
        <RouterLink to="/" class="text-xl font-bold">
            <img src="../assets/Logo.png" alt="Logo" class="h-12 w-12 rounded-full" />
        </RouterLink>

        <!-- Enlaces centrados -->
        <div class="flex gap-8 text-white text-base">
            <RouterLink to="/foro" class="hover:underline">Foro</RouterLink>
            <RouterLink to="/minijuegos" class="hover:underline">Minijuegos</RouterLink>
            <RouterLink to="/listas" class="hover:underline">Listado</RouterLink>
        </div>

        
        <div>
            <img src="../assets/Icon-Perfil.png" alt="Perfil" class="h-12 w-12 rounded-full" />
        </div>
    </nav>
</template>

<style scoped>
</style>