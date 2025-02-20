<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const isOpen = ref(false);
</script>

<template>
  <nav class="bg-[#1F2937] text-[#FDFDFD] shadow-lg fixed w-full z-50">
    <div class="container mx-auto flex justify-between items-center p-4">
      <div class="flex items-center space-x-4">
        <img src="@/assets/images/logo.jpg" alt="Logo" class="h-12 w-12 rounded-full" />
        <a href="#" class="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
  AppointMe
</a>
      </div>

      <div class="hidden md:flex space-x-8 items-center">
        <RouterLink 
          :to="{ name: 'home' }" 
          class="relative text-lg font-medium hover:text-purple-400 transition duration-300"
        >
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
        <RouterLink 
          :to="{ name: 'services' }" 
          class="relative text-lg font-medium hover:text-purple-400 transition duration-300"
        >
          Services
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
        <RouterLink 
          :to="{ name: 'home' }" 
          class="relative text-lg font-medium hover:text-purple-400 transition duration-300"
        >
          Contact
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
      </div>
        
        <div v-if="authStore.user" class="hidden md:flex space-x-3 items-center">
          <RouterLink :to="{ name: 'home' }" @click="authStore.logout"  class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
              Logout
            </RouterLink>
            <RouterLink :to="{ name: 'home' }" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
              Profile
            </RouterLink>
        </div>
        
        <div v-if="!authStore.user" class="hidden md:flex space-x-3 items-center">
          <RouterLink :to="{ name: 'login' }"  class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
            Login
          </RouterLink>
          <RouterLink :to="{ name: 'register' }"  class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
            Register
          </RouterLink>
        </div>

      <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
        <svg
          class="w-8 h-8 text-[#FDFDFD] hover:text-purple-400 transition duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>

    <div 
      v-if="isOpen" 
      class="md:hidden bg-[#1F2937] py-4 space-y-3 text-center border-t border-purple-500"
    >
      <RouterLink 
        :to="{ name: 'home' }" 
        class="block py-2 text-lg font-medium hover:text-purple-400 transition duration-300"
      >
        Home
      </RouterLink>
      <RouterLink 
        :to="{ name: 'services' }" 
        class="block py-2 text-lg font-medium hover:text-purple-400 transition duration-300"
      >
        Services
      </RouterLink>
      <RouterLink 
        :to="{ name: 'home' }" 
        class="block py-2 text-lg font-medium hover:text-purple-400 transition duration-300"
      >
        Contact
      </RouterLink>
      <button class="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
        Get Started
      </button>
    </div>
  </nav>
</template>

<style scoped>
.relative:hover span {
  width: 100%;
}
</style>