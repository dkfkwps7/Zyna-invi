// Simple password protection for admin operations
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'zyna2026';

export function checkAdminAuth(req) {
  const authHeader = req.headers.authorization;
  const providedPassword = authHeader?.replace('Bearer ', '');
  
  return providedPassword === ADMIN_PASSWORD;
}
