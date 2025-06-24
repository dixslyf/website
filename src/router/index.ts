import { createRouter, createWebHistory } from "vue-router";
import { About, Projects, Contact } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "about",
      component: About,
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
  ],
});

export default router;
