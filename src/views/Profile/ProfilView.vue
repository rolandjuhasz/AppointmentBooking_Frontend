<script setup>
import { useAppointmentStore } from "@/stores/appointment";
import { useAuthStore } from "@/stores/auth";
import { useCourseStore } from "@/stores/course";
import { storeToRefs } from "pinia";
import {onMounted, ref } from "vue";

const appointmentStore = useAppointmentStore();
const { appointments } = storeToRefs(appointmentStore);
const authStore = useAuthStore();

const courseStore = useCourseStore();
const userCourses = ref([]);


onMounted(async () => {
  if (authStore.user) {
    userCourses.value = await courseStore.getCoursesForUser(authStore.user.id);
  }
});

onMounted(async () => {
  await appointmentStore.getAppointmentForUser(authStore.user.id);
});

const selectedFile = ref(null);

const onFileSelected = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadAvatar = async () => {
  if (!selectedFile.value) {
    console.error("Nincs kiválasztott fájl!");
    return;
  }

  await authStore.updateAvatar(selectedFile.value);
};



</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex justify-center items-center">
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8" v-if="authStore.user">
      <div class="mt-6 flex flex-col items-center">
  <img :src="authStore.user.avatar" alt="Avatar" class="w-24 h-24 rounded-full shadow-lg">
  
  <input type="file" @change="onFileSelected" class="mt-4">
  <button @click="uploadAvatar" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Upload Avatar</button>
</div>

      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800">Profile Datas</h1>
        <div class="mt-6 flex flex-col items-center">
          <!-- <img :src="authStore.user.avatar" alt="Avatar" class="w-24 h-24 rounded-full shadow-lg"> -->
          <p class="font-bold">Username:</p><span class="text-gray-500 text-xl">{{ authStore.user.name }}</span>
          <p class="font-bold">Email:</p><span class="text-gray-500 text-xl">{{ authStore.user.email }}</span>
        </div>
      </div>

      <div class="mt-10 text-center">
        <h1 class="text-3xl font-bold text-gray-800">Booked Appointments</h1>
        <div class="mt-6 space-y-4">
          <div 
            v-for="appointment in appointments" 
            :key="appointment.id" 
            class="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition"
          >
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-700">{{appointment.course?.title}}</span>
              <span class="text-sm text-gray-500">{{ appointment.appointment_time }}</span>
            </div>
            <div class="mt-2 text-left">
              <p class="text-sm text-gray-600">Created by: {{ appointment.creator?.name }}</p>
            </div>
          </div>
          <div v-if="appointments.length === 0" class="text-gray-500">
            Nincsenek lefoglalt időpontok.
          </div>
        </div>
      </div>
      
      <div class="mt-10 text-center" v-if="authStore.user.role === 'expert' ">
        <h1 class="text-3xl font-bold text-gray-800">Your Courses</h1>
        <div class="mt-6 space-y-4">
          <div 
            v-for="course in userCourses" 
            :key="course.id" 
            class="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition"
          >
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-700">{{ course.title }}</span>
              <span class="text-sm text-gray-500">Created at: {{ course.created_at }}</span>
            </div>
            <div class="mt-2 text-left">
              <p class="text-sm text-gray-600">{{ course.description }}</p>
            </div>
          </div>
          <div v-if="userCourses.length === 0" class="text-gray-500">
            Nincsenek létrehozott kurzusok.
          </div>
        </div>
      </div>

    </div>
    <div v-else>Please log in!</div>
  </main>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>