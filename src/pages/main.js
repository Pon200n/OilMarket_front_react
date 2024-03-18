import React, { useContext } from "react";
import { Card } from "../components/Card";
import { Context } from "../context";
import { BurgerContext } from "../context";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../userContext";
import { BasketContext } from "../basketContext";
import { useRef } from "react";
import { useLayoutEffect } from "react";
let counter = 1;

export function Main() {
  //*
  const [userContext, setUserContext] = useContext(UserContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);
  const [burgerContext, setBurgerContext] = useContext(BurgerContext);

  const [sortBack, setSortBack] = useState("none");
  const [countProd, setCountProd] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    // getAllProducts();
    GetTokenFromServ();
    setBurgerContext(false);
    getAll();
  }, [sortBack, page, limit]);

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
      console.log("нет токена"); // Что-то если вдруг нет токена
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

  // function getAllProducts() {
  //   fetch("http://oilmarket1/getAll/index.php/?sort=" + sortBack, {
  //     method: "GET",
  //     header: {
  //       "Content-Type": "applicaton/x-www-form-urlencoded",
  //     },
  //   })
  //     .then((response) => response.text())
  //     .then((response) => {
  //       JSON.parse(response);

  //       console.log(JSON.parse(response));

  // setItems(
  //   JSON.parse(response, function (key, value) {
  //     if (
  //       key === "id" ||
  //       key === "count" ||
  //       key === "price" ||
  //       key === "priceTotal"
  //     )
  //       return +value;
  //     return value;
  //   })
  // );
  //     });
  // }

  async function getAll() {
    let response = await fetch(
      "http://oilmarket1/getAll/index.php/?sort=" +
        sortBack +
        "&page=" +
        page +
        "&limit=" +
        limit
    );
    let res = await response.json();
    let products2 = await res?.products;
    let countProd = await res?.count;
    setItems(products2);
    setCountProd(countProd);
  }

  let pageCount;
  if (countProd) {
    pageCount = Math.ceil(countProd / limit);
  }
  let pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

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
  // * панель бургер
  // let transform = "translateX(0%)";
  // if (burgerContext) {
  //   transform = "translateX(0%)";
  // } else transform = "translateX(-100%)";
  // *
  // if (document.querySelector("footer").offsetHeight != 0) {
  //   let footHeight = document.querySelector("footer").offsetHeight;
  //   let headHeight = document.querySelector(".main_header").offsetHeight;
  //   let docHeigth = document.documentElement.clientHeight;
  //   let minHeight = docHeigth - (footHeight + headHeight);
  // }
  // let footHeight = document.querySelector("footer").offsetHeight;
  // let headHeight = document.querySelector(".main_header").offsetHeight;
  // let docHeigth = document.documentElement.clientHeight;
  // let minHeight = docHeigth - (footHeight + headHeight);
  // console.log(footHeight, headHeight, docHeigth, minHeight);

  const [active, setActive] = useState(1);
  function paginationToggle(page) {
    setPage(page);
    setActive(page);
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
  return (
    // <div style={{ minHeight: minHeight }}>
    <>
      {/* <h4 ref={ref}>Главная страница</h4> */}
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
                onChange={(event) => setSortBack(event.target.value)}
              >
                <option value="none">сортировка </option>
                <option value="ASC">сортировать по возростанию цены</option>
                <option value="DESC">сортировать по убыванию цены</option>
              </select>
            </div>
          </div>
        )}

        {itemsPage ? (
          itemsPage.map((xProd) => (
            <Card key={xProd.id} item={xProd} addOnBasket={() => add(xProd)} />
          ))
        ) : (
          <h1>Нет данных</h1>
        )}

        {/* </div> */}
      </div>
      <br />
      <div className="pagination_button_block_Pmain">
        {pages &&
          pages.map((b) => (
            <button
              key={b}
              onClick={() => paginationToggle(b)}
              className={active === b ? "active" : "pag_but_Pm"}
            >
              {b}
            </button>
          ))}
        {/* <button onClick={() => setLimit(countProd)}>все</button> */}
      </div>
    </>
  );
}
