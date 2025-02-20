<script setup>
import { useAppointmentStore } from "@/stores/appointment";
import { useAuthStore } from "@/stores/auth";
import { useCourseStore } from "@/stores/course";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const appointmentStore = useAppointmentStore();
const authStore = useAuthStore();
const appointments = ref([]);
const courseStore = useCourseStore();
const { courses, errors } = storeToRefs(courseStore);

const selectedCourse = ref(null);

onMounted(async () => {
  await appointmentStore.getAppointments(route.params.id);
  appointments.value = appointmentStore.appointments;

  await courseStore.getCourses();

  // Megkeressük a megfelelő kurzust az ID alapján
  selectedCourse.value = courses.value.find(course => course.id == route.params.id);
});

</script>

<template>
  <main class="p-8 pt-20 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <div v-if="selectedCourse" class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-gray-100 max-w-3xl mx-auto text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ selectedCourse.title }}</h1>
      <p class="text-lg text-gray-600 mb-4">{{ selectedCourse.description }}</p>
      <span class="text-xl font-semibold text-purple-600">${{ selectedCourse.price }}</span>
    </div>

    <div v-if="appointments.length > 0 && courses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
      <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl p-6 border border-gray-100 relative"
      >
        <div class="flex items-center justify-center mb-4">
          <span class="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            {{ appointment.status || 'Scheduled' }}
          </span>
        </div>

        <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">
          {{ appointment.appointment_time }}
        </h3>

        <div class="flex items-center justify-center text-sm text-gray-500">
          <RouterLink :to="{ name: 'home' }" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
              Book
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">No appointments found for this course.</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        It looks like there are no appointments scheduled yet. Please check back later or schedule a new appointment.
      </p>
      <RouterLink v-if="authStore.user && authStore.user.role === 'expert'"
        :to="{ name: 'addAppointment' }" 
        class="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
      >
        Schedule New Appointment
      </RouterLink>
    </div>
  </main>
</template>


<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.grid > div {
  animation: fadeIn 0.5s ease-in-out;
  animation-fill-mode: both;
}

.grid > div:nth-child(1) { animation-delay: 0.1s; }
.grid > div:nth-child(2) { animation-delay: 0.2s; }
.grid > div:nth-child(3) { animation-delay: 0.3s; }
.grid > div:nth-child(4) { animation-delay: 0.4s; }
.grid > div:nth-child(5) { animation-delay: 0.5s; }
.grid > div:nth-child(6) { animation-delay: 0.6s; }

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>