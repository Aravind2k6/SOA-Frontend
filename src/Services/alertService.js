import axios from "axios";

const API = "http://localhost:8000";

const alertAPI = axios.create({
  baseURL: API,
});

alertAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getAlerts = async () => {
  const response = await alertAPI.get("/alerts");
  return response.data;
};

export const createAlert = async (alert) => {
  const response = await alertAPI.post("/alerts", alert);
  return response.data;
};