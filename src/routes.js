import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },

  {
    path: "/informacion",
    name: "Informacion",
    component: () => import("@/views/InformacionView.vue"),
  },
  {
    path: "/detalle/:id",
    name: "Detalle",
    component: () => import("@/views/DetalleView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
