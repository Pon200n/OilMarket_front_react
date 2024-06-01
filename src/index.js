import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { createContext } from "react";
import UserStore from "./MobxStore/UserStore";
import ProductStore from "./MobxStore/ProductStore";
import ServiceStore from "./MobxStore/ServiceStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const mobxContext = createContext();

root.render(
  <mobxContext.Provider
    value={{
      user: new UserStore(),
      product: new ProductStore(),
      service: new ServiceStore(),
    }}
  >
    <App />
  </mobxContext.Provider>
);

reportWebVitals();
