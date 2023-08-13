import { createRouter, createWebHistory } from "vue-router";
import TodosView from "../views/TodosView.vue";
import TodoPage from "../views/TodoPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodosView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/todo/:pageId",
      name: "todoPage",
      component: TodoPage,
    },
  ],
});

export default router;
