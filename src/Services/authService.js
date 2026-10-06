import axios from "axios";

const API = "http://localhost:8000";
const USERS_KEY = "gridpulse-users";
const REQUESTS_KEY = "gridpulse-account-requests";
const SESSION_KEY = "gridpulse-user";

const readList = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const saveList = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const requestAccount = ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const alreadyRegistered = readList(USERS_KEY).some((user) => user.email === normalizedEmail);
  const alreadyRequested = readList(REQUESTS_KEY).some((request) => request.email === normalizedEmail);
  if (alreadyRegistered || alreadyRequested) throw new Error("An account or request already exists for this email.");
  saveList(REQUESTS_KEY, [...readList(REQUESTS_KEY), {
    id: `${Date.now()}`, name: name.trim(), email: normalizedEmail, password,
    status: "Pending", requestedAt: new Date().toISOString(),
  }]);
};

export const getAccountRequests = () => readList(REQUESTS_KEY);

export const reviewAccountRequest = (id, approved) => {
  const requests = readList(REQUESTS_KEY);
  const request = requests.find((item) => item.id === id);
  if (!request) return;
  if (approved) saveList(USERS_KEY, [...readList(USERS_KEY), { ...request, role: "user" }]);
  saveList(REQUESTS_KEY, requests.filter((item) => item.id !== id));
};

export const getCurrentUser = () => JSON.parse(localStorage.getItem(SESSION_KEY) || "null");

export const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === "manager@gridpulse.local" && password === "Manager123!") {
    const manager = { name: "Facility Manager", email: normalizedEmail, role: "manager" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(manager));
    localStorage.setItem("token", "gridpulse-demo-manager");
    return { token: "gridpulse-demo-manager", user: manager };
  }
  const user = readList(USERS_KEY).find((item) => item.email === normalizedEmail && item.password === password);
  if (user) {
    const sessionUser = { name: user.name, email: user.email, role: user.role || "user" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    localStorage.setItem("token", "gridpulse-approved-user");
    return { token: "gridpulse-approved-user", user: sessionUser };
  }
  if (readList(REQUESTS_KEY).some((item) => item.email === normalizedEmail)) {
    throw new Error("Your account request is waiting for manager approval.");
  }
  try {
    const response = await axios.post(`${API}/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    if (response.data.user) localStorage.setItem(SESSION_KEY, JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Login error:", error);

    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};
