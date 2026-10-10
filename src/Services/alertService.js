import api from "./api";

export const getAlerts = async () => {
  const response = await api.get("/alerts");
  return response.data;
};

export const createAlert = async (alert) => {
  const response = await api.post("/alerts", alert);
  return response.data;
};
