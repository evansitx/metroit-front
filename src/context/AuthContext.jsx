/* eslint-disable react/prop-types */
// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Puedes usar esta instancia o importar una desde services/axiosInstance.js
const axiosInstance = axios.create({
  baseURL: "https://api.metroit.com/api",
});

// Añadir token a cada petición
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validar token y cargar user al inicio
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login del user
  const login = async (credenciales) => {
    try {
      const res = await axios.post(
        "https://api.metroit.com/api/login",
        credenciales
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      return { ok: true };
    } catch (error) {
      console.error("Error de login:", error);
      return {
        ok: false,
        mensaje: error.response?.data?.mensaje || "Error desconocido",
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
