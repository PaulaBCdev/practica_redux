import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./normalize.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";
import configureStore from "./store/index.ts";
import { Provider } from "react-redux";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const store = configureStore({ auth: !!localStorage });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
