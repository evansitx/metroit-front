// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <HeroUIProvider>
      <ToastProvider />
      <RouterProvider router={router}></RouterProvider>
    </HeroUIProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
