<script setup>
import { ref, onMounted } from "vue";
import { useCourseStore } from "@/stores/course";
import { useAppointmentStore } from "@/stores/appointment";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const courseStore = useCourseStore();
const appointmentStore = useAppointmentStore();

const courses = ref([]);
const formData = ref({
  appointment_time: "",
  course_id: ""
});

onMounted(async () => {
  await courseStore.getCourses(); 
  courses.value = courseStore.courses; 
});

onMounted(async () => {
  await courseStore.getCourses();
  

  const userId = authStore.user?.id;
  courses.value = courseStore.courses.filter(course => course.user_id === userId);
});

const handleSubmit = async () => {
  if (!formData.value.appointment_time || !formData.value.course_id) {
    alert("Kérlek, válassz egy kurzust és adj meg egy időpontot!");
    return;
  }

  const appointmentData = {
    appointment_time: formData.value.appointment_time,
    course_id: formData.value.course_id,
  };

  const response = await appointmentStore.createAppointment(appointmentData.course_id, appointmentData);
  alert(response.message);
};
</script>


<template>
  <main class="p-8 pt-20 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Új időpont hozzáadása</h1>

      <form @submit.prevent="handleSubmit" class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100">

        <div class="mb-6">
          <label for="appointment_time" class="block text-sm font-medium text-gray-700 mb-2">Időpont</label>
          <input
            type="date"
            id="appointment_time"
            v-model="formData.appointment_time"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>


        <div class="mb-6">
          <label for="courseId" class="block text-sm font-medium text-gray-700 mb-2">Válassz egy kurzust</label>
          <select
              id="courseId"
              v-model="formData.course_id"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option disabled value="">Válassz kurzust...</option>
              <option v-for="course in courses" :key="course.id" :value="course.id">
                {{ course.title }}
              </option>
          </select>
        </div>

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