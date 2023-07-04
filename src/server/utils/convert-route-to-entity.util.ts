const mapping: Record<string, string> = {
  conversions: 'conversion',
  files: 'file',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
