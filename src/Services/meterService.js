import api from "./api";

export const getMeters = async () => {
  const response = await api.get("/meters");
  return response.data;
};

export const getMeterById = async (id) => {
  const response = await api.get(`/meters/${encodeURIComponent(id)}`);
  return response.data;
};

export const createMeter = async (meter) => {
  const response = await api.post("/meters", meter);
  return response.data;
};

export const deleteMeter = async (id) => {
  const response = await api.delete(`/meters/${encodeURIComponent(id)}`);
  return response.data;
};
