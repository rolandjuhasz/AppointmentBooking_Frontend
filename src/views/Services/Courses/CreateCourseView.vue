<script setup>
import { ref } from "vue";
import { useCourseStore } from "@/stores/course";
import { useRouter } from "vue-router";

const router = useRouter();
const {createCourse} = useCourseStore();

const formData = ref({
  title: "",
  description: "",
  price: 0,
});

const errors = ref({});

</script>

<template>
  <main class="p-8 pt-20 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Course</h1>

      <form @submit.prevent="createCourse(formData)" class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            placeholder="Enter course title"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-2">{{ errors.title[0] }}</p>
        </div>

        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            placeholder="Enter course description"
            rows="4"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-2">{{ errors.description[0] }}</p>
        </div>

        <div class="mb-6">
          <label for="price" class="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <input
            type="number"
            id="price"
            v-model="formData.price"
            placeholder="Enter course price"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <p v-if="errors.price" class="text-red-500 text-sm mt-2">{{ errors.price[0] }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Add Course
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