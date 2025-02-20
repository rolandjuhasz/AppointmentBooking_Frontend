<script setup>
import { useAppointmentStore } from "@/stores/appointment";
import { ref } from "vue";

const {createAppointment} = useAppointmentStore()

const formData = ref({
  appointment_time: "",
  course_id: null
});

const errors = ref({});
</script>

<template>
  <main class="p-8 pt-20 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Új időpont hozzáadása</h1>

      <form @submit.prevent="createAppointment(formData.course_id, formData)" class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100">
        <!-- Esemény neve -->
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Esemény neve</label>
          <input
            type="date"
            id="appointment_time"
            v-model="formData.appointment_time"
            placeholder="Adja meg az esemény nevét"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />

        </div>

        <!-- Leírás -->
        <div class="mb-6">
          <label for="courseId" class="block text-sm font-medium text-gray-700 mb-2">Course id</label>
          <input
          type="number"
            id="courseId"
            v-model="formData.course_id"
            placeholder="Adja meg a kurzus ID-ját"
            rows="4"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          >
        </div>

        <!-- Dátum és időpont -->
        <!-- <div class="mb-6">
          <label for="dateTime" class="block text-sm font-medium text-gray-700 mb-2">Dátum és időpont</label>
          <input
            type="datetime-local"
            id="dateTime"
            v-model="formData.dateTime"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <p v-if="errors.dateTime" class="text-red-500 text-sm mt-2">{{ errors.dateTime[0] }}</p>
        </div> -->

        <!-- Helyszín -->
        <!-- <div class="mb-6">
          <label for="location" class="block text-sm font-medium text-gray-700 mb-2">Helyszín</label>
          <input
            type="text"
            id="location"
            v-model="formData.location"
            placeholder="Adja meg a helyszínt"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <p v-if="errors.location" class="text-red-500 text-sm mt-2">{{ errors.location[0] }}</p>
        </div> -->

        <!-- Résztvevők száma -->
        <!-- <div class="mb-6">
          <label for="maxAttendees" class="block text-sm font-medium text-gray-700 mb-2">Résztvevők maximális száma</label>
          <input
            type="number"
            id="maxAttendees"
            v-model="formData.maxAttendees"
            placeholder="Adja meg a résztvevők számát"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <p v-if="errors.maxAttendees" class="text-red-500 text-sm mt-2">{{ errors.maxAttendees[0] }}</p>
        </div> -->

        <!-- Küldés gomb -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Időpont létrehozása
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

form {
  animation: fadeIn 0.5s ease-in-out;
}
</style>