import React, { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductCard } from "./pages/product_card";
import { Main } from "./pages/main";
// import { BasketPage } from "./pages/BasketPage";
import { Context } from "./context";
import { BurgerContext } from "./context";
import { CategoryContext } from "./context";
import { StatusContext } from "./context";
import { BrandContext } from "./context";
import { BrandsOfCategoryContext } from "./context";
import { CharsValuesContext } from "./context";
import { AllCharsValuesContext } from "./context";
import { AllCharsNamesContext } from "./context";
import { Page_CategoryPageContext } from "./context";
import { FiltrationValuesCategPageContext } from "./context";
import { UserContext } from "./userContext";
import { BasketContext } from "./basketContext";
import { MotorOilPage } from "./pages/MotorOilPage";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage.js";
import { OilPage } from "./pages/OilPage";
import { Form } from "./pages/Form";
import { ComparePage } from "./pages/ComparePage/ComparePage";
import { CreateProductForm } from "./pages/CreateProductForm/CreateProductForm";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BonusPage } from "./pages/BonusPage/BonusPage";
import { TestPage } from "./pages/TestPage/TestPage";
import { PersonalAccount } from "./pages/PersonalAccount/PersonalAccount";
import { AccountBasket } from "./pages/AccountBasket/AccountBasket";
import { OrderUserPage } from "./pages/OrderUserPage/OrderUserPage.js";
import { AddCategory } from "./pages/AddCategory/AddCategory.js";
import { AddBrand } from "./pages/AddBrand/AddBrand.js";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel.js";
import { OrderAdmin } from "./pages/OrderAdmin/OrderAdmin.js";
import { StatusOrderRedact } from "./pages/StatusOrderRedact/StatusOrderRedact";
import { OrdePageAdminRedact } from "./pages/OrdePageAdminRedact/OrdePageAdminRedact";
import { CharsAndValuesOfCat } from "./pages/CharsAndValuesOfCat/CharsAndValuesOfCat";
export default function App() {
  const [context, setContext] = useState([]);
  const [userContext, setUserContext] = useState({});
  const [basketContext, setBasketContext] = useState([]);
  const [categoryContext, setCategoryContext] = useState([]);
  const [statusContext, setStatusContext] = useState([]);
  const [brandContext, setBrandContext] = useState([]);
  const [burgerContext, setBurgerContext] = useState(false);
  const [brandsOfCategoryContext, setBrandsOfCategoryContext] = useState([]);
  const [charsValuesContext, setCharsValuesContext] = useState([]);
  const [allCharsValuesContext, setAllCharsValuesContext] = useState([]);
  const [allCharsNamesContext, setAllCharsNamesContext] = useState([]);
  const [
    filtrationValuesCategPageContext,
    setFiltrationValuesCategPageContext,
  ] = useState([]);
  const [page_CategoryPageContext, setPage_CategoryPageContext] = useState(1);

  useEffect(() => {
    GetTokenFromServ();
    getProdFrBask();
    getCategories();
    getBrands();
    getStatuses();
    getAllCharsAndValues();
  }, []);
  // *
  async function GetTokenFromServ() {
    const token = localStorage.getItem("token"); // Или ваш ключ хранения токена

    if (token) {
      await fetch("http://oilmarket1/tokenTest/tokenTest.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.text())
        .then((response) => {
          let res = JSON.parse(response);

          setUserContext(JSON.parse(response));

          getProdFrBask2(res.id);
        });
    } else {
      console.log("нет токена"); // Что-то если вдруг нет токена
    }
  }
  async function getProdFrBask2(res) {
    await fetch("http://oilmarket1/getProductsFromBasket/?userId=" + res, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        setBasketContext(
          JSON.parse(response, function (key, value) {
            if (
              key === "id" ||
              key === "count" ||
              key === "product_count" ||
              key === "price" ||
              key === "priceTotal"
            )
              return +value;
            return value;
          })
        );
      });
  }

  async function getProdFrBask() {
    await fetch(
      "http://oilmarket1/getProductsFromBasket/?userId=" + userContext.id,
      {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((response) => {
        setBasketContext(
          JSON.parse(response, function (key, value) {
            if (
              key === "id" ||
              key === "count" ||
              key === "product_count" ||
              key === "price" ||
              key === "priceTotal"
            )
              return +value;
            return value;
          })
        );
      });
  }
  async function getCategories() {
    let response = await fetch("http://oilmarket1/getCategory/index.php");
    let categories = await response.json();
    let allbrands = categories?.brands;
    setCategoryContext(categories?.categories);
    setBrandsOfCategoryContext(allbrands);
  }

  async function getBrands() {
    let response = await fetch("http://oilmarket1/getBrand/index.php");
    let brands = await response.json();
    setBrandContext(brands);
  }
  function getStatuses() {
    fetch("http://oilmarket1/getStatuses/index.php")
      .then((response) => response.json())
      .then((response) => {
        setStatusContext(response);
      });
  }
  function getAllCharsAndValues() {
    fetch("http://oilmarket1/getAllCharsAndValues/index.php")
      .then((response) => response.json())
      .then((response) => {
        setAllCharsNamesContext(response.chars);
        setAllCharsValuesContext(response.values);
      });
  }

  // if (userContext.role == "admin") {
  //   getAllChars()
  // }
  return (
    <Context.Provider value={[context, setContext]}>
      <UserContext.Provider value={[userContext, setUserContext]}>
        <BasketContext.Provider value={[basketContext, setBasketContext]}>
          <BurgerContext.Provider value={[burgerContext, setBurgerContext]}>
            <CategoryContext.Provider
              value={[categoryContext, setCategoryContext]}
            >
              <StatusContext.Provider value={[statusContext, setStatusContext]}>
                <BrandContext.Provider value={[brandContext, setBrandContext]}>
                  <BrandsOfCategoryContext.Provider
                    value={[
                      brandsOfCategoryContext,
                      setBrandsOfCategoryContext,
                    ]}
                  >
                    <CharsValuesContext.Provider
                      value={[charsValuesContext, setCharsValuesContext]}
                    >
                      <AllCharsValuesContext.Provider
                        value={[
                          allCharsValuesContext,
                          setAllCharsValuesContext,
                        ]}
                      >
                        <AllCharsNamesContext.Provider
                          value={[
                            allCharsNamesContext,
                            setAllCharsNamesContext,
                          ]}
                        >
                          <FiltrationValuesCategPageContext.Provider
                            value={[
                              filtrationValuesCategPageContext,
                              setFiltrationValuesCategPageContext,
                            ]}
                          >
                            <Page_CategoryPageContext.Provider
                              value={[
                                page_CategoryPageContext,
                                setPage_CategoryPageContext,
                              ]}
                            >
                              <BrowserRouter>
                                <Header></Header>
                                {/* <button onClick={getCategories}>cat</button>
                    <button onClick={getBrands}>brnds</button>
                    <button onClick={getStatuses}>stss</button> */}
                                {/* {categoryContext ? (
                    categoryContext.map((x) => (
                      <div key={x.id}>{x.category_name}</div>
                    ))
                  ) : (
                    <div>нет данных</div>
                  )}
                  {brandContext ? (
                    brandContext.map((x) => (
                      <div key={x.id}>{x.brand_name}</div>
                    ))
                  ) : (
                    <div>нет данных</div>
                  )} */}
                                <Routes>
                                  <Route path="/" element={<Main />}></Route>

                                  <Route
                                    path="/form"
                                    element={<Form />}
                                  ></Route>
                                  <Route
                                    path="/product/:id"
                                    element={<ProductCard />}
                                  ></Route>
                                  {/* <Route path="/basket" element={<BasketPage />}></Route> */}
                                  <Route
                                    path="/compare"
                                    element={<ComparePage />}
                                  ></Route>
                                  <Route
                                    path="/motor_oil"
                                    element={<MotorOilPage />}
                                  ></Route>
                                  <Route
                                    path="/category_page/:category/:brand"
                                    element={<CategoryPage />}
                                  ></Route>
                                  <Route
                                    path="/transmiss_oil"
                                    element={<OilPage />}
                                  ></Route>
                                  <Route
                                    path="/products/:category"
                                    element={<OilPage />}
                                  ></Route>
                                  <Route
                                    path="/bonus"
                                    element={<BonusPage />}
                                  ></Route>
                                  <Route
                                    path="/registration"
                                    element={<RegistrationPage />}
                                  ></Route>
                                  <Route
                                    path="/login"
                                    element={<LoginPage />}
                                  ></Route>
                                  <Route
                                    path="/add_brand"
                                    element={<AddBrand />}
                                  ></Route>
                                  <Route
                                    path="/add_category"
                                    element={<AddCategory />}
                                  ></Route>
                                  <Route
                                    path="/account_basket"
                                    element={<AccountBasket />}
                                  ></Route>
                                  <Route
                                    path="/personalAccount"
                                    element={<PersonalAccount />}
                                  ></Route>
                                  <Route
                                    path="/createProduct"
                                    element={<CreateProductForm />}
                                  ></Route>
                                  <Route
                                    path="/test"
                                    element={<TestPage />}
                                  ></Route>
                                  <Route
                                    path="/order_user"
                                    element={<OrderUserPage />}
                                  ></Route>
                                  <Route
                                    path="/admin_panel"
                                    element={<AdminPanel />}
                                  ></Route>
                                  <Route
                                    path="/order_admin"
                                    element={<OrderAdmin />}
                                  ></Route>
                                  <Route
                                    path="/status_order_redact"
                                    element={<StatusOrderRedact />}
                                  ></Route>
                                  <Route
                                    path="/order_page_admin_redact/:id"
                                    element={<OrdePageAdminRedact />}
                                  ></Route>
                                  <Route
                                    path="/chars_values_of_cat/:id"
                                    element={<CharsAndValuesOfCat />}
                                  ></Route>
                                </Routes>
                                {/* <Footer></Footer> */}
                              </BrowserRouter>
                            </Page_CategoryPageContext.Provider>
                          </FiltrationValuesCategPageContext.Provider>
                        </AllCharsNamesContext.Provider>
                      </AllCharsValuesContext.Provider>
                    </CharsValuesContext.Provider>
                  </BrandsOfCategoryContext.Provider>
                </BrandContext.Provider>
              </StatusContext.Provider>
            </CategoryContext.Provider>
          </BurgerContext.Provider>
        </BasketContext.Provider>
      </UserContext.Provider>
    </Context.Provider>
  );
}
