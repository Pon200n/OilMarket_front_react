import React, { useContext } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { Context } from "../context";
import { BurgerContext } from "../context";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../userContext";
import { BasketContext } from "../basketContext";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { getProducts } from "../http/productAPI";
import { observer } from "mobx-react";
import { mobxContext } from "..";

let counter = 1;

export const Main = observer(() => {
  //*
  const [userContext, setUserContext] = useContext(UserContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);
  const [burgerContext, setBurgerContext] = useContext(BurgerContext);

  const [sortByPrice, setSortByPrice] = useState("none");
  const [countProd, setCountProd] = useState();
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const [perPage, setPerPage] = useState(15);
  useEffect(() => {
    // GetTokenFromServ();
    setBurgerContext(false);
    // getAllProductsMainLara();
    getAllProductsMainLaraSECOND();
    // getAll();
  }, [sortByPrice, page, perPage]);
  useEffect(() => {
    paginationToggle(1);
  }, [perPage]);

  // *
  async function GetTokenFromServ() {
    const token = localStorage.getItem("token"); // Или ваш ключ хранения токена
    // console.log(token);
    if (token) {
      await fetch("http://oilmarket1/tokenTest/tokenTest.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          //   "Content-Type": "applicaton/x-www-form-urlencoded",
        },
      })
        .then((response) => response.text())
        .then((response) => {
          let res = JSON.parse(response);
          setUserContext(JSON.parse(response));
          getProdFrBask2(res.id);
        });
    } else {
      // console.log("нет токена"); // Что-то если вдруг нет токена
    }
  }
  // *
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
  //*

  const [context, setContext] = useContext(Context); //старый контекст корзины
  let [itemsPage, setItems] = useState();

  // *lega fetch products
  // async function getAll() {
  //   let response = await fetch(
  //     "http://oilmarket1/getAll/index.php/?sort=" +
  //       sortByPrice +
  //       "&page=" +
  //       page +
  //       "&limit=" +
  //       limit
  //   );
  //   let res = await response.json();
  //   let products2 = await res?.products;
  //   let countProd = await res?.count;
  //   setItems(products2);
  //   setCountProd(countProd);
  // }
  // *

  // function getAllProductsMainLara() {
  //   fetch("http://localhost:8000/paginate?page=" + page)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       // let pageCount = response.last_page;
  //       //* setPageCount(response.last_page);
  //       //* setItems(response.data);
  //       // console.log("lara", response.data);
  //       // console.log("lastPage", response.last_page);
  //     });
  // }

  function getAllProductsMainLaraSECOND() {
    fetch(
      "http://127.0.0.1:8000/getAllProductsResourse?page=" +
        page +
        "&perPage=" +
        perPage +
        "&sortByPrice=" +
        sortByPrice
    )
      .then((response) => response.json())
      .then((response) => {
        setItems(response.data);
        setPageCount(response.meta.last_page);
        // console.log("data", response.data);
        // console.log("meta", response.meta);
        // console.log("response", response);
        // console.log("last_page", response.meta.last_page);
        // console.log("per_page", response.meta.per_page);
      });
  }
  const [pageCount, setPageCount] = useState(0);

  // * lega pagination
  // let pageCount;
  // if (countProd) {
  //   pageCount = Math.ceil(countProd / limit);
  // }
  // *
  let pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  const [active, setActive] = useState(1);
  function paginationToggle(page) {
    setPage(page);
    setActive(page);
  }

  let pagesVeiwArr = [];
  function makePagesArrView() {
    //* let delta = Math.ceil(pageCount / 5 - 1);
    let delta = 5;
    let Start = active - delta;
    if (pageCount <= 20) {
      for (let i = 0; i < pageCount; i++) {
        pagesVeiwArr.push(i + 1);
      }
    } else {
      if (Start > 0 && active + delta <= pageCount) {
        for (
          let start = active - (delta + 1);
          start < active + delta;
          start++
        ) {
          pagesVeiwArr.push(start + 1);
        }
      } else if (active + delta > pageCount) {
        for (let i = pageCount - (delta * 2 + 1); i < pageCount; i++) {
          pagesVeiwArr.push(i + 1);
        }
      } else {
        for (let i = 0; i < delta * 2 + 1; i++) {
          pagesVeiwArr.push(i + 1);
        }
      }
    }
  }
  // *new pagination arr function end
  makePagesArrView();

  function add(product) {
    let findProd = context.find((item) => item.id === product.id);

    if (product.id === findProd?.id) {
      alert("Этот товар уже есть в корзине");
    } else {
      context.push({ ...product });
      setContext([...context]);
    }
  }

  function sort() {
    itemsPage = itemsPage.sort((a, b) => {
      return (a.price - b.price) * counter;
    });
    counter *= -1;
    setItems([...itemsPage]);
  }

  const [toggleFilterSettings, setToggleFilterSettings] = useState(false);

  let ref = useRef(null);
  useLayoutEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, [page]);

  //! csrf token LARAVEL
  function csrf_get() {
    // fetch("http://127.0.0.1:8000/sanctum/csrf-cookie")
    fetch(process.env.REACT_APP_API_URL + "sanctum/csrf-cookie");
    // .then((response) => response.text())
    // .then((response) => console.log(response));
    // .then(console.log(document.cookie));
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("token");

  // !!!!!!
  const axiosGet = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/1`);
      console.log(response);
      // return response.data;
    } catch (err) {
      console.error(err.toJSON());
    }
  };

  // * получение товаров с сервера laravel 26,05,2024
  const { product } = useContext(mobxContext);

  async function getProductsLara() {
    await getProducts(page, perPage).then((response) => {
      console.log("productsLARA", response?.data?.data);
      product.setProducts(response?.data?.data);
      setPageCount(response.data.meta.last_page);
      console.log("meta", response.data.meta);
      console.log("last_page", response.data.meta.last_page);
    });
  }
  useEffect(() => {
    getProductsLara();
  }, [page, perPage]);
  return (
    <>
      <div id="main_wrapper">
        <button
          ref={ref}
          onClick={() => setToggleFilterSettings(!toggleFilterSettings)}
        >
          filter settings
        </button>
        {toggleFilterSettings && (
          <div className="filterPanelMainPage">
            <div>
              <button className="c-button" onClick={sort}>
                сортировать по цене
              </button>
              <select
                name=""
                id=""
                onChange={(event) => setSortByPrice(event.target.value)}
              >
                <option value="none">сортировка </option>
                <option value="ASC">сортировать по возростанию цены</option>
                <option value="DESC">сортировать по убыванию цены</option>
              </select>
            </div>
          </div>
        )}

        {/* {itemsPage ? (
          itemsPage.map((xProd) => (
            <Card key={xProd.id} item={xProd} addOnBasket={() => add(xProd)} />
          ))
        ) : (
          <h1>Нет данных</h1>
        )} */}
        {product.products.length > 0 ? (
          product?.products?.map((productL) => (
            // <div key={productL.id}>{productL.name}</div>
            <Card
              key={productL.id}
              item={productL}
              // addOnBasket={() => add(productL)}
            />
          ))
        ) : (
          <h1>Нет данных</h1>
        )}

        {/* </div> */}
      </div>
      <br />
      <div className="pagination_button_block_Pmain">
        {/* {pages &&
          pages.map((b) => (
            <button
              key={b}
              onClick={() => paginationToggle(b)}
              className={active === b ? "active" : "pag_but_Pm"}
            >
              {b}
            </button>
          ))} */}
        {pagesVeiwArr &&
          pagesVeiwArr.map((b) => (
            <button
              key={b}
              onClick={() => paginationToggle(b)}
              className={active === b ? "active" : "pag_but_Pm"}
            >
              {b}
            </button>
          ))}
        {/* <button onClick={() => setLimit(countProd)}>все</button> */}
        <label>
          На странице:
          <select value={perPage} onChange={(e) => setPerPage(e.target.value)}>
            {/* <option selected value={perPage}>
              {perPage}
            </option> */}
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="35">35</option>
          </select>
        </label>
      </div>
      {/* <button onClick={axiosGet}>запрос через аксиос</button>
      <button onClick={csrf_get}>csrf_get</button>
      <button onClick={getCookie}>getCookie</button>
      <button onClick={() => console.log(csrftoken)}>csrftoken</button>
      <button onClick={() => console.log(process.env.REACT_APP_API_URL)}>
        REACT_APP_API_URL
      </button> */}
    </>
  );
});

export default Main;
