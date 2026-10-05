import axios from "axios";

const API = "http://localhost:8000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API}/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);

    // Temporary demo login
    if (email && password) {
      const demoToken = "demo-jwt-token";

      localStorage.setItem("token", demoToken);

      return {
        token: demoToken,
        user: {
          name: "GridPulse User",
          email: email,
        },
      };
    }

    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};