import axios from "axios";

const configuredURL = import.meta.env.VITE_API_URL;
const baseURL = configuredURL || (import.meta.env.DEV ? "http://localhost:8000" : undefined);

export const isFrontendDemoMode = import.meta.env.DEV && !configuredURL;

if (configuredURL && import.meta.env.PROD && new URL(configuredURL).protocol !== "https:") {
  throw new Error("VITE_API_URL must use HTTPS in production.");
}

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
