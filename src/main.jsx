// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
