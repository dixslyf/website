export const routes = [
  {
    path: "/",
    name: "about",
  },
  {
    path: "/projects",
    name: "projects",
  },
  {
    path: "/contact",
    name: "contact",
  },
] as const;

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

export function exitSlideDirection(from: URL, to: URL): "left" | "right" | null {
  const fromName = routes.find(({ path }) => path === from.pathname)?.name;
  const toName = routes.find(({ path }) => path === to.pathname)?.name;

  if (!fromName || !toName) {
    return null;
  }

  const sorted = [fromName, toName].sort(sortRoutes);

  // If `fromName` is first, then it's to the left of the route we're going to,
  // so slide it out to the left.
  return sorted[0] === fromName ? "left" : "right";
}
