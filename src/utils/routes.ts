import type { RouteLocationNormalizedGeneric } from "vue-router";

export function sortRoutes(routeAName: string, routeBName: string): number {
  if (routeAName === "about") {
    return -1;
  }

  if (routeBName === "about") {
    return 1;
  }

  if (routeAName === "projects" && routeBName === "contact") {
    return -1;
  }

  if (routeAName === "contact" && routeBName === "projects") {
    return 1;
  }

  return 0;
}

export function slideDirection(toName: string, fromName: string): "left" | "right" {
  const sorted = [fromName, toName].sort(sortRoutes);

  // If `fromName` is first, then it's to the left of the route we're going to,
  // so slide it out to the left.
  return sorted[0] === fromName ? "left" : "right";
}
