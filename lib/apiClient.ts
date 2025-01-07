import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api", // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor (e.g., for auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your token management logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor (e.g., for error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Redirect to login page or handle token refresh
    }
    return Promise.reject(error);
  }
);

export default apiClient;
