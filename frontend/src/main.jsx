import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";

import { PredictionProvider } from "./context/PredictionContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PredictionProvider>
        <App />
      </PredictionProvider>
    </AuthProvider>
  </StrictMode>
);