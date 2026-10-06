import axios from "axios";

const API = "http://localhost:8000";

const usageAPI = axios.create({
  baseURL: API,
});

usageAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getUsage = async () => {
  const response = await usageAPI.get("/usage");
  return response.data;
};

export const getMeterUsage = async (meterId) => {
  const response = await usageAPI.get(`/usage/${meterId}`);
  return response.data;
};

// Per-account demo readings for accounts approved in the browser prototype.
// Production accounts should receive account-scoped readings from the API.
export const getPortalUsage = () => {
  const user = JSON.parse(localStorage.getItem("gridpulse-user") || "null");
  if (!user || user.role === "manager" || localStorage.getItem("token") !== "gridpulse-approved-user") return null;

  const email = user.email.toLowerCase();
  let seed = 0;
  for (let index = 0; index < email.length; index += 1) seed = (seed * 31 + email.charCodeAt(index)) >>> 0;
  const scale = 0.65 + (seed % 71) / 100;
  const times = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
  const chart = times.map((time, index) => ({
    time,
    usage: Math.round((120 + ((seed >>> (index % 16)) % 280) + index * 17) * scale),
  }));
  const todayUsage = Math.round(chart.reduce((sum, point) => sum + point.usage, 0) / 7);
  const count = 1 + (seed % 4);
  const meters = Array.from({ length: count }, (_, index) => ({
    id: `MTR-${String((seed % 900) + 100)}-${String(index + 1).padStart(2, "0")}`,
    location: `${user.name}'s ${["Home", "Office", "Workshop", "Annex"][index]}`,
    status: index === count - 1 && seed % 3 === 0 ? "Offline" : "Online",
    usage: (1.2 + ((seed >>> (index * 3)) % 70) / 10).toFixed(2),
    chart: times.map((time, pointIndex) => ({
      time,
      usage: Math.round((32 + ((seed >>> ((pointIndex + index * 2) % 16)) % 95) + pointIndex * 6) * (0.7 + index * 0.18)),
    })),
    todayUsage: (todayUsage / count * (0.75 + index * 0.2)).toFixed(1),
    monthlyUsage: Math.round(todayUsage * (20 + index)).toString(),
    dailyLimit: (25 + index * 5).toString(),
  }));

  return {
    meters,
    chart,
    totalMeters: count,
    todayUsage,
    currentLoad: meters.reduce((sum, meter) => sum + Number(meter.usage), 0).toFixed(2),
    activeAlerts: seed % 4,
    averageDaily: (todayUsage * 0.92).toFixed(1),
    peak: Math.max(...meters.map((meter) => Number(meter.usage))).toFixed(1),
    lowest: Math.min(...meters.map((meter) => Number(meter.usage))).toFixed(1),
    monthlyUsage: Math.round(todayUsage * 25),
  };
};
