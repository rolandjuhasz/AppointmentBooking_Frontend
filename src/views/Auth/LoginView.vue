<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

onMounted(() => (errors.value = {}));
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Login</h1>
      <p v-if="errors.verification" class="text-red-500 text-sm text-center mb-4">
  {{ errors.verification }}
</p>

      <form
        @submit.prevent="authenticate('login', formData)"
        class="space-y-6"
      >
        <div>
          <input
            type="text"
            placeholder="Email"
            v-model="formData.email"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <p
            class="text-red-500 text-sm mt-2"
            v-if="errors.email && errors.email[0]"
          >
            {{ errors.email[0] }}
          </p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            v-model="formData.password"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <p
            class="text-red-500 text-sm mt-2"
            v-if="errors.password && errors.password[0]"
          >
            {{ errors.password[0] }}
          </p>
        </div>

        <button
          class="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>

        <p class="text-center text-gray-600">
          Don't have an account? 
          <RouterLink 
            :to="{ name: 'register' }" 
            class="text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            Register here
          </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>

<style scoped>
button:hover {
  box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.3), 0 2px 4px -1px rgba(147, 51, 234, 0.2);
}
</style>