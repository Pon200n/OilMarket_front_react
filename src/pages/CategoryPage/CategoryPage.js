import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Card } from "../../components/Card";
import { CardProductGrid } from "../../components/CardProductGrid/CardProductGrid.js";
import { PaginationPanel } from "../../components/PaginationPanel/PaginationPanel";
import { AllCharsValuesContext } from "../../context";
import { AllCharsNamesContext } from "../../context";
import { Page_CategoryPageContext } from "../../context";
import { FiltrationValuesCategPageContext } from "../../context";
import { useContext } from "react";
import { FilterBarCategoryPage } from "../../components/FilterBarCategoryPage/FilterBarCategoryPage.js";
import "./CategoryPage.css";
export function CategoryPage() {
  const [page_CategoryPageContext, setPage_CategoryPageContext] = useContext(
    Page_CategoryPageContext
  );
  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  const [allCharsNamesContext, setAllCharsNamesContext] =
    useContext(AllCharsNamesContext);
  const [filtredChars, setFilterdChars] = useState([]);
  const [
    filtrationValuesCategPageContext,
    setFiltrationValuesCategPageContext,
  ] = useContext(FiltrationValuesCategPageContext);

  const router = useParams();
  const routCat = router?.category;
  const routBrnd = router?.brand;

  function getAllCharsAndValues() {
    fetch("http://oilmarket1/getAllCharsAndValues/index.php")
      .then((response) => response.json())
      .then((response) => {
        setAllCharsNamesContext(response.chars);
        setAllCharsValuesContext(response.values);
        filterCharsOfCategory2(response.chars);
      });
  }

  if (allCharsNamesContext.length === 0) {
    getAllCharsAndValues();
  }

  function filterCharsOfCategory() {
    let filt = allCharsNamesContext.filter((char) => {
      if (char.category_id == routCat) {
        return char;
      }
    });
    setFilterdChars(filt);
  }
  function filterCharsOfCategory2(arrCharsName) {
    let filt = arrCharsName.filter((char) => {
      if (char.category_id == routCat) {
        return char;
      }
    });
    setFilterdChars(filt);
  }

  useEffect(() => {
    filterCharsOfCategory();
  }, [routCat]);

  const [products, setProducts] = useState([]);
  const [catName, setCatName] = useState();
  const [brndName, setBrndName] = useState();

  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);
  const [limit, setLimit] = useState(20);
  const [countProd, setCountProd] = useState();
  const [sortByPrice, setSortByPrice] = useState();
  const [hideFilterBar, setHideFilterBar] = useState(true);
  const [hideFilterBarMobile, setHideFilterBarMobile] = useState(false);

  function getCategoryProducts() {
    fetch(
      "http://oilmarket1/getCategoryProducts/?categoryID=" +
        routCat +
        "&brandID=" +
        routBrnd +
        "&page=" +
        page_CategoryPageContext +
        "&limit=" +
        limit +
        "&ArrValues=" +
        filtrationValuesCategPageContext +
        "&sortByPrice=" +
        sortByPrice,
      {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        let products = response.products;
        let category = response.category.category_name;
        let brand = response.brand.brand_name;
        let countProd = response?.countProd;
        let ArrValues2 = response?.ArrValues2;
        let FiltratedProd = response?.FiltratedProd;
        // console.log("response", response);
        // console.log("ArrValues2", ArrValues2);
        // console.log("FiltratedProd", FiltratedProd);
        // console.log(countProd);
        // console.log(category);
        // console.log(brand);
        setBrndName(brand);
        setProducts(products);
        setCatName(category);
        setCountProd(countProd);
      });
  }
  useEffect(() => {
    setFiltrationValuesCategPageContext([]);
  }, [
    routCat,
    // routBrnd
  ]);

  useEffect(() => {
    getCategoryProducts();
  }, [
    // routCat,
    routBrnd,
    page_CategoryPageContext,
    limit,
    filtrationValuesCategPageContext,
    sortByPrice,
  ]);

  let pageCount;
  if (countProd) {
    pageCount = Math.ceil(countProd / limit);
  }

  let pages = [];
  // let pages = [0, 1, 2];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  function SetPage(p) {
    setPage_CategoryPageContext(p);
  }

  function paginationToggle(page) {
    setPage_CategoryPageContext(page);
    setActive(page);
  }
  let ref = useRef(null);
  useLayoutEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, [page_CategoryPageContext]);

  // console.log(products);

  return (
    <>
      {/* <div className="cat_page_main_wrapper"> */}
      {hideFilterBarMobile && (
        <div className="cat_page_mobile_filter_bar_overlay_hide">
          <div
            className="cat_page_mobile_filter_bar_overlay"
            onClick={() => setHideFilterBarMobile(false)}
          ></div>
          <div className="cat_page_filter_bar_Mobile_wrapper">
            <div className="cat_page_mobile_filter_bar">
              <button onClick={() => setHideFilterBarMobile(false)}>
                Фильтры Х
              </button>

              {filtredChars &&
                filtredChars.map((item) => (
                  <div
                    key={item?.id}
                    className="cat_page_filter_bar_char_block"
                  >
                    <span className="cat_page_filter_bar_char_name">
                      {item?.char_name}
                    </span>
                    <FilterBarCategoryPage item={item} />
                  </div>
                ))}
              <button onClick={() => setFiltrationValuesCategPageContext([])}>
                Очистить все
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 ref={ref}>
          {catName} {brndName} {countProd}ед.
        </h2>
      </div>

      {/* <div className="cat_page_filter_bar">
        {filtredChars &&
          filtredChars.map((item) => (
            <div key={item?.id} className="cat_page_filter_bar_char_block">
              <span className="cat_page_filter_bar_char_name">
                {item?.char_name}
              </span>
              <FilterBarCategoryPage item={item} />
            </div>
          ))}
        <button onClick={() => setFiltrationValuesCategPageContext([])}>
          Очистить все
        </button>
      </div>
      <div className="cat_page_sort_panel">
        <label>
          Сортировать по:
          <select
            id=""
            name=""
            onChange={(event) => setSortByPrice(event.target.value)}
          >

            <option value="ASC">возростанию цены</option>
            <option value="DESC">убыванию цены</option>
          </select>
        </label>
      </div>
      {products.length > 0 ? (
        products.map((product) => <Card key={product.id} item={product} />)
      ) : (
        <h3>Товаров с такими характеристиками не найдено</h3>
      )}

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
      </div> */}
      <section>
        <div className="wwwrap">
          <div style={{ display: "flex", justifyContent: "center" }}></div>
          <div className="flex_wrapper12">
            {hideFilterBar && (
              <div className="cat_page_filter_bar">
                <button onClick={() => setHideFilterBar(false)}>
                  Фильтры Х
                </button>

                {filtredChars &&
                  filtredChars.map((item) => (
                    <div
                      key={item?.id}
                      className="cat_page_filter_bar_char_block"
                    >
                      <span className="cat_page_filter_bar_char_name">
                        {item?.char_name}
                      </span>
                      <FilterBarCategoryPage item={item} />
                    </div>
                  ))}
                <button onClick={() => setFiltrationValuesCategPageContext([])}>
                  Очистить все
                </button>
              </div>
            )}
            <div className="innerwrap">
              <div className="cat_page_sort_panel_wrapper">
                <div className="cat_page_sort_panel">
                  <label>
                    Сортировать по:
                    <select
                      id=""
                      name=""
                      onChange={(event) => setSortByPrice(event.target.value)}
                    >
                      <option value="ASC">возростанию цены</option>
                      <option value="DESC">убыванию цены</option>
                    </select>
                  </label>
                </div>
                <div>
                  <button
                    className="cat_page_desc_filter_panel_hide_button"
                    onClick={() => setHideFilterBar(!hideFilterBar)}
                  >
                    Фильтры
                  </button>
                  <button
                    className="cat_page_mobile_filter_panel_hide_button"
                    onClick={() => setHideFilterBarMobile(!hideFilterBarMobile)}
                  >
                    Фильтры
                  </button>
                </div>
              </div>

              {/* <div className="grid_container12">
                {products.map((product) => (
                  <CardProductGrid key={product.id} item={product} />
                ))}
              </div> */}
              <div className="grid_container12">
                {products.length > 0 ? (
                  products.map((product) => (
                    <CardProductGrid key={product.id} item={product} />
                  ))
                ) : (
                  <h3>Товаров с такими характеристиками не найдено</h3>
                )}
              </div>
            </div>
          </div>
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
        </div>
      </section>
      {/* </div> */}
    </>
  );
}
