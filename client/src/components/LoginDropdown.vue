<!-- src/components/LoginDropdown.vue -->
<template>
  <div class="absolute right-4 top-14 bg-white text-black rounded shadow-lg p-4 w-80 z-50">
    <template v-if="isAuthenticated">
      <h3 class="text-lg font-bold text-center">¡Hola {{ user?.name || 'Usuario' }}!</h3>
      <p class="text-center text-sm mt-2">Ya estás autenticado.</p>
      <form @submit.prevent="handleLogout" class="mt-4">
        <button
          type="submit"
          class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </form>
    </template>

    <template v-else>
      <h3 class="text-lg font-bold mb-3 text-center">Iniciar Sesión</h3>
      <form @submit.prevent="handleLogin" class="space-y-3">
        <input
          v-model="email"
          type="email"
          placeholder="Correo"
          class="w-full p-2 rounded border"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full p-2 rounded border"
        />
        <button
          type="submit"
          class="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded"
        >
          Entrar
        </button>
      </form>
      <p class="mt-3 text-center text-sm">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-gray-600 hover:underline">Regístrate</router-link>
      </p>
    </template>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

axios.defaults.withCredentials = true

const email = ref('')
const password = ref('')
const router = useRouter()
const user = ref(null)
const isAuthenticated = ref(false)

const emit = defineEmits(['close'])

const handleLogout = async () => {
  try {
    await axios.get('http://localhost:4000/logout', {}, { withCredentials: true })
    isAuthenticated.value = false
    user.value = null
    console.log('Usuario deslogueado')
  } catch (err) {
    console.error('Error en logout:', err.response?.data || err.message)
  }
}

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:4000/login', {
        email: email.value,
        password: password.value
    }, { withCredentials: true })

    isAuthenticated = true
    isAuthenticated.value = true
    console.log('Usuario logueado:', res.data)
    emit('close') // cierra el dropdown
    router.push('/minijuegos') 
    // puedes cambiar a /perfil si quieres
  } catch (err) {
    console.error('Error en login:', err.response?.data || err.message)
  }
}

const checkAuth = async () => {
  try {
    const response = await axios.get('http://localhost:4000/verify')
    user.value = response.data
    isAuthenticated.value = true
  } catch (error) {
    isAuthenticated.value = false
  }
}

onMounted(() => {
  checkAuth()
})
</script>
