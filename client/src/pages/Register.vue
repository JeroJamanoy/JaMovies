<template>
    <div class="text-white p-4 max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Registro</h2>
        <form @submit.prevent="handleRegister">
            <input v-model="userid" placeholder="Usuario" class="w-full mb-2 p-2 rounded text-black" />
            <input v-model="name" placeholder="Nombre" class="w-full mb-2 p-2 rounded text-black" />
            <input v-model="email" type="email" placeholder="Correo" class="w-full mb-2 p-2 rounded text-black" />
            <input v-model="number_phone" placeholder="Teléfono" class="w-full mb-2 p-2 rounded text-black" />
            <input v-model="password" type="password" placeholder="Contraseña"
                class="w-full mb-4 p-2 rounded text-black" />
            <button type="submit" class="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Registrar</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userid = ref('');
const name = ref('');
const email = ref('');
const number_phone = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
    try {
        const res = await axios.post('http://localhost:4000/register', {
            userid: userid.value,
            name: name.value,
            email: email.value,
            number_phone: number_phone.value,
            password: password.value
        }, { withCredentials: true });

        console.log('Registrado:', res.data);
        router.push('/');
    } catch (err) {
        console.error('Error en registro:', err.response?.data || err.message);
    }
};
</script>
