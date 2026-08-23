import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});


// --------------------------------------------------
// Attach Firebase authentication token
// --------------------------------------------------

api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();

        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(
        "Failed to attach Firebase token:",
        error
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;