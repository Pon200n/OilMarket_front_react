import React, { useContext } from "react";
import Card from "../components/Card";
import { Context } from "../context";
import { BurgerContext } from "../context";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { getProducts } from "../http/productAPI";
import { observer } from "mobx-react";
import { mobxContext } from "..";
import CardProductGrid from "../components/CardProductGrid/CardProductGrid";
import { paginationLinks } from "../functions/pagination";

let counter = 1;

export const Main = observer(() => {
  //*
  const [burgerContext, setBurgerContext] = useContext(BurgerContext);

  const [sortByPrice, setSortByPrice] = useState("none");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  useEffect(() => {
    setBurgerContext(false);
  }, [sortByPrice, page, perPage]);

  useEffect(() => {
    paginationToggle(1);
  }, [perPage]);

  const [context, setContext] = useContext(Context); //старый контекст корзины
  let [itemsPage, setItems] = useState();

  const [pageCount, setPageCount] = useState(0);

  // * lega pagination
  // let pageCount;
  // if (countProd) {
  //   pageCount = Math.ceil(countProd / limit);
  // }
  // *
  // let pages = [];
  // for (let i = 0; i < pageCount; i++) {
  //   pages.push(i + 1);
  // }
  const [active, setActive] = useState(1);
  function paginationToggle(page) {
    setPage(page);
    setActive(page);
  }

  // let pagesVeiwArr = [];
  // function makePagesArrView() {
  //   //* let delta = Math.ceil(pageCount / 5 - 1);
  //   let delta = 5;
  //   let Start = active - delta;
  //   if (pageCount <= 20) {
  //     for (let i = 0; i < pageCount; i++) {
  //       pagesVeiwArr.push(i + 1);
  //     }
  //   } else {
  //     if (Start > 0 && active + delta <= pageCount) {
  //       for (
  //         let start = active - (delta + 1);
  //         start < active + delta;
  //         start++
  //       ) {
  //         pagesVeiwArr.push(start + 1);
  //       }
  //     } else if (active + delta > pageCount) {
  //       for (let i = pageCount - (delta * 2 + 1); i < pageCount; i++) {
  //         pagesVeiwArr.push(i + 1);
  //       }
  //     } else {
  //       for (let i = 0; i < delta * 2 + 1; i++) {
  //         pagesVeiwArr.push(i + 1);
  //       }
  //     }
  //   }
  // }
  // makePagesArrView();
  // *new pagination arr function end

  // ?????????????? pagination export function
  const [pageLinksArr, setPageLinksArr] = useState([]);

  function expPagination(pageCountRes) {
    let pageLinks = paginationLinks(active, pageCountRes);
    setPageLinksArr(pageLinks);
    // console.log(pageLinks);
  }
  // ??????????????

  // function add(product) {
  //   let findProd = context.find((item) => item.id === product.id);

  //   if (product.id === findProd?.id) {
  //     alert("Этот товар уже есть в корзине");
  //   } else {
  //     context.push({ ...product });
  //     setContext([...context]);
  //   }
  // }

  // function sort() {
  //   itemsPage = itemsPage.sort((a, b) => {
  //     return (a.price - b.price) * counter;
  //   });
  //   counter *= -1;
  //   setItems([...itemsPage]);
  // }

  const [toggleFilterSettings, setToggleFilterSettings] = useState(false);

  let ref = useRef(null);
  useLayoutEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, [page]);

  // * получение товаров с сервера laravel 26,05,2024
  const { product } = useContext(mobxContext);
  const { service } = useContext(mobxContext);

  let category_id = "";
  let brand_id = "";
  let values = "";
  let sortByPriceLara = "asc";

  async function getProductsLara() {
    try {
      await getProducts(
        page,
        perPage,
        category_id,
        brand_id,
        values,
        sortByPriceLara
      ).then((response) => {
        product.setProducts(response?.data?.data);
        setPageCount(response.data.meta.last_page);
        expPagination(response.data.meta.last_page);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }

  useEffect(() => {
    getProductsLara();
  }, [page, perPage]);
  return (
    <>
      {/* <button onClick={expPagination}>export pagination</button> */}
      <h3 ref={ref}> Главная</h3>
      <div id="main_wrapper">
        {/* <button
          ref={ref}
          onClick={() => setToggleFilterSettings(!toggleFilterSettings)}
        >
          filter settings
        </button> */}
        {/* {toggleFilterSettings && (
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
        )} */}

        {/* {product.products.length > 0 ? (
          product?.products?.map((productL) => (
            <Card key={productL.id} item={productL} />
          ))
        ) : (
          <h1>Нет данных</h1>
        )} */}

        <div className="grid_container12">
          {product?.products?.length > 0 ? (
            product?.products?.map((product) => (
              <CardProductGrid key={product.id} item={product} />
            ))
          ) : (
            <h3>Товаров с такими характеристиками не найдено</h3>
          )}
        </div>
      </div>
      <br />
      <div className="pagination_button_block_Pmain">
        {pageLinksArr &&
          pageLinksArr.map((b) => (
            <button
              key={b}
              onClick={() => paginationToggle(b)}
              className={active === b ? "active" : "pag_but_Pm"}
            >
              {b}
            </button>
          ))}
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
    </>
  );
});

export default Main;
