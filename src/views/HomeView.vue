<script setup>

</script>

<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 flex items-center justify-center overflow-hidden">
    
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent)]"></div>

    <div class="text-center z-10 px-6 sm:px-12">
      <h1 class="text-5xl sm:text-6xl font-extrabold text-gray-800 drop-shadow-lg animate-fade-in">
        Schedule Your Appointment in Minutes
      </h1>
      <p class="text-lg sm:text-xl mt-6 max-w-2xl mx-auto text-gray-600 animate-fade-in-up">
        Our easy-to-use system helps you schedule your appointments quickly and efficiently.
      </p>

      <div class="mt-8 flex justify-center space-x-6 animate-fade-in-up">
        <button class="px-10 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
          Book Now
        </button>
        <button class="px-10 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105">
          Learn More
        </button>
      </div>
    </div>

    <div class="absolute inset-0 overflow-hidden">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
  </div>
</template>

<style scoped>

  .animate-fade-in {
    animation: fadeIn 1.5s ease-in-out;
  }

  .animate-fade-in-up {
    animation: fadeInUp 1.5s ease-in-out;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .particle {
    position: absolute;
    background: rgba(147, 51, 234, 0.1);
    border-radius: 50%;
    animation: float 5s infinite ease-in-out;
  }

  .particle:nth-child(1) {
    width: 20px;
    height: 20px;
    top: 10%;
    left: 20%;
    animation-duration: 6s;
  }

  .particle:nth-child(2) {
    width: 15px;
    height: 15px;
    top: 30%;
    left: 70%;
    animation-duration: 8s;
  }

  .particle:nth-child(3) {
    width: 25px;
    height: 25px;
    top: 50%;
    left: 40%;
    animation-duration: 7s;
  }

  .particle:nth-child(4) {
    width: 10px;
    height: 10px;
    top: 70%;
    left: 80%;
    animation-duration: 9s;
  }

  .particle:nth-child(5) {
    width: 30px;
    height: 30px;
    top: 90%;
    left: 10%;
    animation-duration: 10s;
  }

  @keyframes float {
    0% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
  }
</style>