import axios from "axios";

const API = "http://localhost:8000";

const meterAPI = axios.create({
  baseURL: API,
});

meterAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getMeters = async () => {
  const response = await meterAPI.get("/meters");
  return response.data;
};

export const getMeterById = async (id) => {
  const response = await meterAPI.get(`/meters/${id}`);
  return response.data;
};

export const createMeter = async (meter) => {
  const response = await meterAPI.post("/meters", meter);
  return response.data;
};

export const deleteMeter = async (id) => {
  const response = await meterAPI.delete(`/meters/${id}`);
  return response.data;
};