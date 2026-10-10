import api from "./api";

export const getUsage = async () => {
  const response = await api.get("/usage");
  return response.data;
};

export const getMeterUsage = async (meterId) => {
  const response = await api.get(`/usage/${encodeURIComponent(meterId)}`);
  return response.data;
};

// Per-account sample data was removed; account-scoped usage must come from the API.
export const getPortalUsage = () => null;

