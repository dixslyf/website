import type { RouteLocationNormalizedGeneric } from "vue-router";

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) => {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion.value) {
      from.meta.pageTransition = { name: "page-fade", mode: "out-in" };
      return;
    }

    const toName = to.name?.toString() || "undefined";
    const fromName = from.name?.toString() || "undefined";

    const direction = slideDirection(toName, fromName);

    to.meta.inDirection = direction;
    from.meta.pageTransition = { name: `page-slide-${direction}`, mode: "out-in" };
  },
);
