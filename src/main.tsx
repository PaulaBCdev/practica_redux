import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./normalize.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";
import configureStore from "./store/index.ts";
import { Provider } from "react-redux";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

const store = configureStore({ auth: !!localStorage }, router);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
