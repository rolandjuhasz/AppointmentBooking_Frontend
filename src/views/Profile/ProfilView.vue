<script setup>
const user = {
  name: "John Doe",
  title: "Software Developer",
  bio: "Passionate developer with experience in Vue.js, Tailwind CSS, and modern web technologies.",
  avatar: "https://via.placeholder.com/150", // Cseréld ki saját képre
  socialLinks: [
    { name: "GitHub", url: "https://github.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "LinkedIn", url: "https://linkedin.com" }
  ]
};
</script>

<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent)]"></div>

    <div class="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full z-10">
      <img :src="user.avatar" alt="Profile Picture" class="w-32 h-32 rounded-full mx-auto border-4 border-purple-500 shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mt-4">{{ user.name }}</h2>
      <p class="text-purple-600 font-medium">{{ user.title }}</p>
      <p class="text-gray-600 mt-4">{{ user.bio }}</p>

      <div class="mt-6 flex justify-center space-x-4">
        <a v-for="link in user.socialLinks" :key="link.name" :href="link.url" target="_blank"
           class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
          {{ link.name }}
        </a>
      </div>
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
