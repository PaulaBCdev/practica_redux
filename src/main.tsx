import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./normalize.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import AuthProvider from "./pages/auth/auth-provider.tsx";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider defaultIsLogged={!!accessToken}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
