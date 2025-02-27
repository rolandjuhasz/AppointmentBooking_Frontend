<script setup>
import { onMounted } from "vue";
import { useCourseStore } from "@/stores/course";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore()
const courseStore = useCourseStore();
const { courses, errors } = storeToRefs(courseStore);

onMounted(() => {
  courseStore.getCourses();
});
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
    <div class="container mx-auto py-10">
      <h1 class="text-4xl mt-10 font-bold text-center text-gray-800 mb-8">
        Available Courses
        <RouterLink v-if="authStore.user && authStore.user.role === 'expert'" :to="{ name: 'createCourse' }" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
          Add new course
        </RouterLink>
      </h1>

      <div v-if="courses.length === 0" class="text-center text-xl text-gray-600">
        No courses available.
        <RouterLink v-if="authStore.user && authStore.user.role === 'expert'" :to="{ name: 'createCourse' }" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300">
          Add new course
        </RouterLink>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="course in courses"
          :key="course.id"
          class="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 border border-gray-100"
        >
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {{ course.user.name.charAt(0) }}
            </div>
            <p class="text-sm font-semibold text-gray-700">{{ course.user.name }}</p>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ course.title }}</h2>
          <p class="text-gray-600 mb-4 line-clamp-3">{{ course.description }}</p>

          <p class="text-xl font-bold text-purple-600 mb-6">{{ course.price }} €</p>

          <RouterLink
            :to="{ name: 'appointment', params: { id: course.id } }"
            class="inline-block w-full text-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Read more...
          </RouterLink>

          <!-- Plusz jel csak akkor, ha a kurzus a felhasználóhoz tartozik -->
          <!-- <div v-if="course.user_id === authStore.user.id" class="mt-4 text-right">
            <RouterLink
              :to="{ name: 'addAppointment', params: { courseId: course.id } }"
              class="text-xl text-green-600"
            >
              +
            </RouterLink>
          </div> -->
        </div>
      </div>
    </div>
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