import api from "./api";

let currentUser = null;

export const getCurrentUser = () => currentUser;

export const loadCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    currentUser = response.data.user ?? response.data;
    return currentUser;
  } catch (error) {
    currentUser = null;
    if (error.response?.status === 401) return null;
    throw error;
  }
};

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email: email.trim().toLowerCase(), password });
  currentUser = response.data.user ?? null;
  if (!currentUser) await loadCurrentUser();
  if (!currentUser) throw new Error("The server did not return an authenticated user.");
  return { user: currentUser };
};

export const requestAccount = async ({ name, email, password }) => {
  await api.post("/auth/request-access", {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  });
};

export const getAccountRequests = async () => {
  const response = await api.get("/manager/account-requests");
  return response.data.requests ?? response.data;
};

export const reviewAccountRequest = async (id, approved) => {
  await api.patch(`/manager/account-requests/${encodeURIComponent(id)}`, { approved });
};

export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    currentUser = null;
  }
};

export const isAuthenticated = () => currentUser !== null;
