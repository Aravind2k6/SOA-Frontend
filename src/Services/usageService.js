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