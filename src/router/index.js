import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import LoginView from "@/views/LoginView.vue";
import auth from "../firebase"

const routes = [
  {
    path: "/todos",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
if(to.path === '/login' && auth.currentUser){
  next('/')
  return
}
if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
  next('/login')
  return
}
next()
})
export default router;
