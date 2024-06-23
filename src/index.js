import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { createContext } from "react";
import UserStore from "./MobxStore/UserStore";
import ProductStore from "./MobxStore/ProductStore";
import ServiceStore from "./MobxStore/ServiceStore";
import OrderStore from "./MobxStore/OrderStore";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const mobxContext = createContext();

root.render(
  <mobxContext.Provider
    value={{
      user: new UserStore(),
      product: new ProductStore(),
      service: new ServiceStore(),
      order: new OrderStore(),
    }}
  >
    <App />
  </mobxContext.Provider>
);

reportWebVitals();
