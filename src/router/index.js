import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import ServiceView from '@/views/Services/Courses/CoursesView.vue'
import AppointmentView from '@/views/Services/Appointments/AppointmentView.vue'
import CreateCourseView from '@/views/Services/Courses/CreateCourseView.vue'
import CreateAppointmentsView from '@/views/Services/Appointments/CreateAppointmentsView.vue'
import ProfilView from '@/views/Profile/ProfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: "/services",
      name: "services",
      component: ServiceView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilView,
    },
    {
      path: "/courses/:id/appointments",
      name: "appointment",
      component: AppointmentView,
    },
    {
      path: "/createCourse",
      name: "createCourse",
      component: CreateCourseView,
      meta: {auth: true, role: "expert"}
    },
    {
      path: "/appointments",
      name: "addAppointment",
      component: CreateAppointmentsView,
      meta: {auth: true, role: "expert"}
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }

  if (to.meta.role && authStore.user.role !== to.meta.role) {
    return ({ name: "services" });
  }
});

export default router;
