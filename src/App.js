import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductCard } from "./pages/product_card";
import { Main } from "./pages/main";
import { BasketPage } from "./pages/BasketPage";
import { Context } from "./context";
import { MotorOilPage } from "./pages/MotorOilPage";
import { OilPage } from "./pages/OilPage";
import Form from "./pages/Form";
import { ComparePage } from "./pages/ComparePage/ComparePage";

export default function App() {
  const [context, setContext] = useState([]);
  return (
    <Context.Provider value={[context, setContext]}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/product/:id" element={<ProductCard />}></Route>
          <Route path="/basket" element={<BasketPage />}></Route>
          <Route path="/compare" element={<ComparePage />}></Route>
          <Route path="/motor_oil" element={<MotorOilPage />}></Route>
          <Route path="/transmiss_oil" element={<OilPage />}></Route>
          <Route path="/products/:category" element={<OilPage />}></Route>
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </Context.Provider>
  );
}
