export function getStoreFromPath(pathname: string): string | null {
  const pathParts = pathname.split('/').filter(Boolean);
  const knownRoutes = ['start', 'permission', 'take-selfie', 'validate-selfie', 'form', 'final-processing'];
  
  if (pathParts.length > 0 && !knownRoutes.includes(pathParts[0])) {
    return pathParts[0];
  }
  
  return null;
}

export function buildPath(route: string, pathname: string): string {
  const store = getStoreFromPath(pathname);
  return store ? `/${store}${route}` : route;
}
