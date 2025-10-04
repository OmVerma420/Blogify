import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
