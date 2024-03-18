import { useParams } from "react-router-dom";
import { Table } from "../components/charTable";

// import { items } from "../components/products";

import { DiscriptionOil } from "../components/product_disription";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { UserContext } from "../userContext";
import { BasketContext } from "../basketContext";

export function ProductCard() {
  useEffect(() => {
    getProductByIDFromServ();
  }, []);
  const router = useParams();
  const rout = router.id;
  // console.log(router);
  // console.log(rout);
  const [req, setReq] = useState();
  const [userContext, setUserContext] = useContext(UserContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);
  const [discrToggle, setDiscrToggle] = useState(false);
  const [charTableToggle, setCharTableToggle] = useState(false);
  const [productChars, setProductChars] = useState([]);

  let userDataFromLocalStorage = localStorage.getItem("token");
  // console.log(userDataFromLocalStorage);
  // setUserContext({ userDataFromLocalStorage });

  //* Скрыть кнопку {удалить}
  let adminDisplay;
  if (userContext.role == "admin") {
    adminDisplay = "flex";
  } else adminDisplay = "none";

  //* удалить product из базы
  function deleteFromBase() {
    fetch("http://oilmarket1/del/?id=" + rout, {
      method: "GET", //POST
      header: {
        "Content-Type": "applicaton/x-www-form-urlencoded",
      },
      // body: JSON.stringify(rout),
    })
      .then((response) => response.text())
      .then((response) => {
        JSON.parse(response);
        // console.log(response);
      });
  }
  function del() {
    const qvest = window.confirm("Хотите удалить карточку товара?");
    if (qvest) {
      deleteFromBase();
    }
  }

  //* Получить product по id из БД
  // function getProductByIDFromServ() {
  //   fetch("http://oilmarket1/getByID/?id=" + rout, {
  //     method: "GET", //POST
  //     header: {
  //       "Content-Type": "applicaton/x-www-form-urlencoded",
  //     },
  //     // body: JSON.stringify({ action: 1 }),
  //   })
  //     .then((response) => response.text())
  //     .then((response) => {
  //       JSON.parse(response);
  //       // let product = response.product
  //       setItems(
  //         JSON.parse(response, function (key, value) {
  //           if (
  //             key === "id" ||
  //             key === "count" ||
  //             key === "price" ||
  //             key === "priceTotal"
  //           )
  //             return +value;
  //           return value;
  //         })
  //       );
  //       // console.log(response);
  //     });
  // }
  function getProductByIDFromServ() {
    fetch("http://oilmarket1/getByID/?id=" + rout, {
      method: "GET",
      header: {
        "Content-Type": "applicaton/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // let product = response.product
        setItems(response.product);
        setProductChars(response.chars);
        console.log(response);
      });
  }
  let [items, setItems] = useState();
  // console.log(items);
  const priceForm = new Intl.NumberFormat();
  // console.log(userContext.id);
  //*Добавить product в корзину на сервер
  function addToBasketProduct() {
    fetch(
      "http://oilmarket1/addProductToBasket/?productId=" +
        rout +
        "&userId=" +
        userContext.id,
      {
        method: "GET", //POST
        header: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(rout),
      }
    )
      .then((response) => response.text())
      .then((response) => {
        setReq(JSON.parse(response));
        console.log("req", JSON.parse(response));
        setBasketContext(JSON.parse(response));
      });
    alert("товар добавлен в корзину");
  }
  // if (items) {
  //   let item = items.find((item) => item.id == router.id);
  //   console.log(item);
  // }

  // const [context, setContext] = useContext(Context);
  // function add() {
  //   let findProduct = context.find((it) => it.id == item.id);
  //   if (item.id === findProduct?.id) {
  //     alert("Этот товар уже есть в козине");
  //   } else {
  //     context.push({ ...item });
  //     setContext([...context]);
  //   }
  // }

  return (
    <>
      <div className="card_center">
        {items ? (
          <div className="cart_single">
            <div className="name_char_single">
              {items?.category_name} {items?.brand_name} {items?.name}{" "}
              {items?.SAE}, {items?.volume}
            </div>
            <div className="cart_img_single">
              <img
                className="img_single"
                src={"http://oilmarket1/static/" + items.img}
                alt=""
              />
              <div className="card_img_single_aside">
                <div className="card_img_single_aside_content">
                  <div className="price_card">
                    {priceForm.format(items?.price)} ₽
                  </div>
                  <div className="fav">
                    <a href="#" className="btn_2_card">
                      <img
                        src="/icon/free-icon-star-126482.png"
                        width="20px"
                        height="20px"
                        alt=""
                      />
                      Избранное
                    </a>
                  </div>
                  <div className="comp">
                    <a href="#" className="btn_2_card">
                      <img
                        src="/icon/business-and-finance.png"
                        width="20px"
                        height="20px"
                        alt=""
                      />
                      Сравнение
                    </a>
                  </div>
                  <div className="but_bask_card">
                    {/* <button className="button_card" onClick={() => add()}>
                    В корзину
                  </button> */}
                  </div>
                  <div className="bay_card">
                    <button onClick={del} style={{ display: adminDisplay }}>
                      Удалить товар
                    </button>
                    <br />
                    <button
                      className="bay_oneclick_card"
                      onClick={addToBasketProduct}
                    >
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card_discr">
              <ul className="discrList">
                <li
                  className="discrButton"
                  onClick={() => setDiscrToggle(!discrToggle)}
                >
                  Описание
                </li>
                <li
                  className="discrButton"
                  onClick={() => setCharTableToggle(!charTableToggle)}
                >
                  Характеристики
                </li>
              </ul>
            </div>
            {discrToggle && (
              <div className="discr_text">
                <p className="tt">{items?.discr}</p>
              </div>
            )}
            {charTableToggle && <Table chars={productChars} />}
          </div>
        ) : (
          <h1>none</h1>
        )}
      </div>
    </>
  );
}
