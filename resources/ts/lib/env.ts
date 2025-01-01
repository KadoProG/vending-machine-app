export const safeEnv = {
  VITE_API_URL: import.meta.env.VITE_API_URL as string,
  VITE_FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL as string,
} as const;
