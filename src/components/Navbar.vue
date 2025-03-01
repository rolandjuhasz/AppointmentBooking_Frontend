<script setup>
import { ref } from 'vue';

const user = {
  name: "John Doe",
  title: "Software Developer",
  bio: "Passionate developer with experience in Vue.js, Tailwind CSS, and modern web technologies.",
};

const bookings = ref([
  { course: "Vue.js Basics", date: "2024-03-10", time: "10:00 AM" },
  { course: "Advanced Tailwind CSS", date: "2024-03-15", time: "2:00 PM" },
  { course: "Full-Stack Development", date: "2024-04-01", time: "5:00 PM" }
]);
</script>

<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent)]"></div>

    <div class="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full z-10">
      <img :src="user.avatar" alt="Profile Picture" class="w-32 h-32 rounded-full mx-auto border-4 border-purple-500 shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mt-4">{{ user.name }}</h2>
      <p class="text-purple-600 font-medium">{{ user.title }}</p>
      <p class="text-gray-600 mt-4">{{ user.bio }}</p>
      
      <h3 class="text-xl font-semibold text-gray-800 mt-6">Foglalásaid</h3>
      <ul class="mt-4 space-y-3">
        <li v-for="booking in bookings" :key="booking.date + booking.time" class="bg-purple-100 p-3 rounded-lg shadow-sm">
          <p class="text-gray-700"><strong>Kurzus:</strong> {{ booking.course }}</p>
          <p class="text-gray-700"><strong>Dátum:</strong> {{ booking.date }}</p>
          <p class="text-gray-700"><strong>Időpont:</strong> {{ booking.time }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .animate-fade-in {
    animation: fadeIn 1.5s ease-in-out;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
</style>
