<template>
    <div class="text-white p-4 max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Correo" class="w-full mb-2 p-2 rounded text-black" />
            <input v-model="password" type="password" placeholder="Contraseña"
                class="w-full mb-4 p-2 rounded text-black" />
            <button type="submit" class="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Entrar</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {
        const res = await axios.post('http://localhost:4000/login', {
            email: email.value,
            password: password.value
        }, { withCredentials: true });

        console.log('Usuario logueado:', res.data);
        router.push('/'); // o perfil
    } catch (err) {
        console.error('Error en login:', err.response?.data || err.message);
    }
};
</script>
