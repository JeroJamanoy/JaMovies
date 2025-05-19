<template>
    <form @submit.prevent="agregarUsuario" class="space-y-4 bg-white p-4 shadow rounded">
        <div>
            <label class="block font-medium">Nombre</label>
            <input v-model="usuario.nombre" type="text" class="w-full border p-2 rounded" required />
        </div>

        <div>
            <label class="block font-medium">Email</label>
            <input v-model="usuario.email" type="email" class="w-full border p-2 rounded" required />
        </div>

        <div>
            <label class="block font-medium">Teléfono</label>
            <input v-model="usuario.telefono" type="text" class="w-full border p-2 rounded" />
        </div>

        <div>
            <label class="block font-medium">Contraseña</label>
            <input v-model="usuario.contraseña" type="password" class="w-full border p-2 rounded" required />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Guardar Usuario
        </button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['usuario-agregado']);

const usuario = ref({
    nombre: '',
    email: '',
    telefono: '',
    contraseña: ''
});

const agregarUsuario = async () => {
    await axios.post('http://localhost:3000/api/usuarios', usuario.value);
    usuario.value = { nombre: '', email: '', telefono: '', contraseña: '' };
    emit('usuario-agregado');
};
</script>