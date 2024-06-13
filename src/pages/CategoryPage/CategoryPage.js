import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import CardProductGrid from "../../components/CardProductGrid/CardProductGrid.js";
import { PaginationPanel } from "../../components/PaginationPanel/PaginationPanel";
import { AllCharsValuesContext } from "../../context";
import { AllCharsNamesContext } from "../../context";
import { Page_CategoryPageContext } from "../../context";
import { FiltrationValuesCategPageContext } from "../../context";
import { useContext } from "react";
import { FilterBarCategoryPage } from "../../components/FilterBarCategoryPage/FilterBarCategoryPage.js";
import "./CategoryPage.css";
import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { getProducts } from "../../http/productAPI";
import { paginationLinks } from "../../functions/pagination.js";

export const CategoryPage = observer(() => {
  const { product } = useContext(mobxContext);

  // export function CategoryPage() {
  const [page_CategoryPageContext, setPage_CategoryPageContext] = useContext(
    Page_CategoryPageContext
  );
  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  const [allCharsNamesContext, setAllCharsNamesContext] =
    useContext(AllCharsNamesContext);
  const [filtredChars, setFilterdChars] = useState([]);
  const [filtredCharsLara, setFilterdCharsLara] = useState([]);
  const [
    filtrationValuesCategPageContext,
    setFiltrationValuesCategPageContext,
  ] = useContext(FiltrationValuesCategPageContext);

  const router = useParams();
  const routCat = router?.category;
  const routBrnd = router?.brand;

  // function getAllCharsAndValues() {
  //   fetch("http://oilmarket1/getAllCharsAndValues/index.php")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setAllCharsNamesContext(response.chars);
  //       setAllCharsValuesContext(response.values);
  //       filterCharsOfCategory2(response.chars);
  //     });
  // }

  // if (allCharsNamesContext.length === 0) {
  //   getAllCharsAndValues();
  // }

  // function filterCharsOfCategory() {
  //   let filt = allCharsNamesContext.filter((char) => {
  //     if (char.category_id == routCat) {
  //       return char;
  //     }
  //   });
  //   setFilterdChars(filt);
  // }
  function filterCharsLra() {
    // console.log("product.chars", product.chars);
    let filt = product.chars.filter((char) => {
      if (char.category_id == routCat) {
        return char;
      }
    });
    setFilterdCharsLara(filt);
  }

  useEffect(() => {
    // filterCharsOfCategory();
    filterCharsLra();
  }, [routCat]);

  const [products, setProducts] = useState([]);
  const [catName, setCatName] = useState();
  const [brndName, setBrndName] = useState();

  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);
  const [limit, setLimit] = useState(20);
  const [countProd, setCountProd] = useState();
  const [sortByPrice, setSortByPrice] = useState("asc");
  const [hideFilterBar, setHideFilterBar] = useState(true);
  const [hideFilterBarMobile, setHideFilterBarMobile] = useState(false);
  const [perPage, setPerPage] = useState(15);

  const [productQuntity, setProductQuntity] = useState(0);

  // function getCategoryProducts() {
  //   fetch(
  //     "http://oilmarket1/getCategoryProducts/?categoryID=" +
  //       routCat +
  //       "&brandID=" +
  //       routBrnd +
  //       "&page=" +
  //       page_CategoryPageContext +
  //       "&limit=" +
  //       limit +
  //       "&ArrValues=" +
  //       filtrationValuesCategPageContext +
  //       "&sortByPrice=" +
  //       sortByPrice,
  //     {
  //       method: "GET",
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       let products = response.products;
  //       let category = response.category.category_name;
  //       let brand = response.brand.brand_name;
  //       let countProd = response?.countProd;
  //       let ArrValues2 = response?.ArrValues2;
  //       let FiltratedProd = response?.FiltratedProd;
  //       setBrndName(brand);
  //       setProducts(products);
  //       setCatName(category);
  //       setCountProd(countProd);
  //     });
  // }

  // function getProdsCatPageResourse() {
  //   fetch(
  //     "http://127.0.0.1:8000/getProdsCatPageResourse/?category=" +
  //       routCat +
  //       "&manufact=" +
  //       routBrnd +
  //       "&sortByPrice=" +
  //       sortByPrice +
  //       "&perPage=" +
  //       perPage
  //   ).then((response) => response.json());
  // }

  // !
  async function getProductsLara() {
    await getProducts(
      page,
      perPage,
      routCat,
      // routBrnd,
      routBrnd === "''" ? "" : routBrnd,
      filtrationValuesCategPageContext,
      sortByPrice
    ).then((response) => {
      console.log(response);
      product.setProducts(response.data.data);
      setProductQuntity(response.data.meta.total);
      expPagination(response.data.meta.last_page);
    });
  }
  useEffect(() => {
    setFiltrationValuesCategPageContext([]);
  }, [
    routCat,
    // routBrnd
  ]);
  // !

  useEffect(() => {
    getProductsLara();
  }, [
    routCat,
    routBrnd,
    page_CategoryPageContext,
    limit,
    filtrationValuesCategPageContext,
    sortByPrice,
    perPage,
    page,
  ]);

  // *pagination
  // let pageCount;
  // if (countProd) {
  //   pageCount = Math.ceil(countProd / limit);
  // }

  // let pages = [];
  // for (let i = 0; i < pageCount; i++) {
  //   pages.push(i + 1);
  // }

  //* function SetPage(p) {
  //*   setPage_CategoryPageContext(p);
  //* }

  function paginationToggle(page) {
    //* setPage_CategoryPageContext(page);
    setPage(page);
    setActive(page);
  }

  useEffect(() => {
    paginationToggle(1);
    console.log("useEffect Value change page=", page);
  }, [filtrationValuesCategPageContext]);

  const [pageLinksArr, setPageLinksArr] = useState([]);

  function expPagination(pageCountRes) {
    let pageLinks = paginationLinks(active, pageCountRes);
    setPageLinksArr(pageLinks);
  }
  // *pagination

  let ref = useRef(null);
  useLayoutEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, [page_CategoryPageContext]);

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

              {/* {filtredChars &&
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
                ))} */}

              {filtredCharsLara &&
                filtredCharsLara.map((item) => (
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
        {/* <h2 ref={ref}>
          {catName} {brndName} {countProd}ед.
        </h2> */}
        <h3 ref={ref}>
          {product.products[0] && product?.products[0]?.category?.category_name}{" "}
          {product.products[0] && product?.products[0]?.brand?.brand_name}{" "}
          {product.products[0] && productQuntity}ед.
        </h3>
      </div>
      {/* {countProd}ед. */}

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
                {/* <button onClick={() => console.log(filtredCharsLara)}>
                  filtredCharsLara
                </button> */}
                {filtredCharsLara &&
                  filtredCharsLara.map((item) => (
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
                      <option value="asc">возростанию цены</option>
                      <option value="desc">убыванию цены</option>
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
                {product?.products?.length > 0 ? (
                  product?.products?.map((product) => (
                    <CardProductGrid key={product.id} item={product} />
                  ))
                ) : (
                  <h3>Товаров с такими характеристиками не найдено</h3>
                )}
              </div>
            </div>
          </div>
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
            {/* <button onClick={() => setLimit(countProd)}>все</button> */}
            <label>
              На странице:
              <select
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
              >
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
        </div>
      </section>
      {/* </div> */}
    </>
  );
});
// export default CategoryPage;
