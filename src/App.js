import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductCard from "./pages/product_card";
import Main from "./pages/main";
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
import { CategoryPage } from "./pages/CategoryPage/CategoryPage.js";
import { ComparePage } from "./pages/ComparePage/ComparePage";
import CreateProductForm from "./pages/CreateProductForm/CreateProductForm";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BonusPage from "./pages/BonusPage/BonusPage";
import { TestPage } from "./pages/TestPage/TestPage";
import { PersonalAccount } from "./pages/PersonalAccount/PersonalAccount";
import AccountBasket from "./pages/AccountBasket/AccountBasket";
import OrderUserPage from "./pages/OrderUserPage/OrderUserPage.js";
import { AddCategory } from "./pages/AddCategory/AddCategory.js";
import { AddBrand } from "./pages/AddBrand/AddBrand.js";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel.js";
import OrderAdmin from "./pages/OrderAdmin/OrderAdmin.js";
import StatusOrderRedact from "./pages/StatusOrderRedact/StatusOrderRedact";
import OrdePageAdminRedact from "./pages/OrdePageAdminRedact/OrdePageAdminRedact";
import CharsAndValuesOfCat from "./pages/CharsAndValuesOfCat/CharsAndValuesOfCat";
import { observer } from "mobx-react";
import { mobxContext } from ".";
import {
  getBrandsLara,
  getCategoriesLara,
  getCharsLara,
  getProducts,
  getValuesLara,
} from "./http/productAPI";
import { setUserData } from "./http/userAPI";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import {
  getOrders,
  getStatuses,
  getUserProductsFromBasket,
} from "./http/orderAPI";

const App = observer(() => {
  const { user } = useContext(mobxContext);
  const { product } = useContext(mobxContext);
  const { service } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

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
    // GetTokenFromServ();
    // getProdFrBask();
    // getCategories();
    // getBrands();
    // getStatuses();
    // getAllCharsAndValues();
    // ???
    getCatsLara();
    getBrandsLARA();
    setUserDataLara();
    getCatCharsLara();
    getCharValuesLara();
    getStatusesLara();
    getUserProductsFromBasketLara();
    getOrdersLara();
    // getProductsLara();
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
  // function getStatuses() {
  //   fetch("http://oilmarket1/getStatuses/index.php")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setStatusContext(response);
  //     });
  // }
  function getAllCharsAndValues() {
    fetch("http://oilmarket1/getAllCharsAndValues/index.php")
      .then((response) => response.json())
      .then((response) => {
        setAllCharsNamesContext(response.chars);
        setAllCharsValuesContext(response.values);
      });
  }

  // *lara
  async function getCatsLara() {
    try {
      await getCategoriesLara().then((response) => {
        product.setCategories(response.data.data);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }
  async function getCatCharsLara() {
    try {
      await getCharsLara().then((response) => {
        product.setChars(response.data.data);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }
  async function getCharValuesLara() {
    try {
      await getValuesLara().then((response) => {
        product.setValues(response.data.data);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }

  async function getBrandsLARA() {
    try {
      await getBrandsLara().then((response) => {
        product.setBrands(response.data.data);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }

  async function setUserDataLara() {
    try {
      await setUserData().then((response) => {
        user.setThisUser(response.data);
        user.setThisRole(response.data.role);
        user.setThisAuth(true);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }

  async function getStatusesLara() {
    try {
      await getStatuses().then((response) => {
        // console.log("getStatuses", response.data.data);
        // console.log("order.order_statuses", order.order_statuses);
        order.setStatuses(response.data.data);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }
  async function getUserProductsFromBasketLara() {
    try {
      await getUserProductsFromBasket().then((response) => {
        // console.log("ProductsFromBasket main", response);
        order.setUserBasketProducts(response.data.basket.basket_products);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }
  async function getOrdersLara() {
    try {
      await getOrders().then((response) => {
        // console.log("getOrders app", response);
        user.setOrders(response.data);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }

  // async function getProductsLara() {
  //   await getProducts().then((response) => {
  //     console.log("productsLARA", response?.data?.data);
  //     product.setProducts(response?.data?.data);
  //   });
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
                                <ModalWindow></ModalWindow>
                                <Routes>
                                  <Route path="/" element={<Main />}></Route>

                                  <Route
                                    path="/product/:id"
                                    element={<ProductCard />}
                                  ></Route>
                                  <Route
                                    path="/compare"
                                    element={<ComparePage />}
                                  ></Route>
                                  <Route
                                    path="/category_page/:category/:brand"
                                    element={<CategoryPage />}
                                  ></Route>
                                  {/* <Route
                                    path="/category_page/:category/"
                                    element={<CategoryPage />}
                                  ></Route> */}
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
                                    path="/account_basket"
                                    element={<AccountBasket />}
                                  ></Route>
                                  <Route
                                    path="/personalAccount"
                                    element={<PersonalAccount />}
                                  ></Route>

                                  <Route
                                    path="/test"
                                    element={<TestPage />}
                                  ></Route>
                                  <Route
                                    path="/order_user"
                                    element={<OrderUserPage />}
                                  ></Route>
                                  {user.user.role === "admin" ? (
                                    <>
                                      <Route
                                        path="/admin_panel"
                                        element={<AdminPanel />}
                                      ></Route>
                                      <Route
                                        path="/createProduct"
                                        element={<CreateProductForm />}
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
                                    </>
                                  ) : (
                                    <Route path="/" element={<Main />}></Route>
                                  )}

                                  <Route
                                    path="*"
                                    element={<Navigate to="/" replace />}
                                  />
                                  {/* </BackButton> */}

                                  {/* <Navigate to={"/"} replace /> */}
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
});
export default App;
