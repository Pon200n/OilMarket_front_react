import { useParams } from "react-router-dom";

import { Table } from "../components/charTable";
import { DiscriptionOil } from "../components/product_disription";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context";

export function CardPage() {
  useEffect(() => {
    clickHandler();
  }, []);

  function clickHandler() {
    fetch("http://oilmarket1/getByID/index.php", {
      method: "GET", //POST
      header: {
        "Content-Type": "applicaton/x-www-form-urlencoded",
      },
      // body: JSON.stringify({ action: 1 }),
    })
      .then((response) => response.text())
      .then((response) => {
        JSON.parse(response);
        // console.log(1);
        setItems(
          JSON.parse(response, function (key, value) {
            if (
              key === "id" ||
              key === "count" ||
              key === "price" ||
              key === "priceTotal"
            )
              return +value;
            return value;
          })
        );
      });
  }
  function deleteFromBase() {
    fetch("http://oilmarket1/del/index.php", {
      method: "GET", //POST
      header: {
        "Content-Type": "applicaton/x-www-form-urlencoded",
      },
      // body: JSON.stringify({ action: 1 }),
    })
      .then((response) => response.text())
      .then((response) => {
        JSON.parse(response);
        console.log(response);
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
      });
  }
  let [items, setItems] = useState();

  const router = useParams();
  console.log(router);
  console.log(2, items);

  const priceForm = new Intl.NumberFormat();

  let item = items.find((item) => item.id == router.id);

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
    <div>
      {items ? <h1>{items[0].name}</h1> : <h1>None</h1>}

      <div className="cart_single">
        <div className="name_char_single">
          {/* {item?.category} */}
          {item?.category_name}
          {item?.brand_name}
          {/* {item?.manufact}  */}
          {item?.name} {item?.SAE}, {item?.volume}
        </div>
        <div className="cart_img_single">
          <img className="img_single" src={item?.imgCard} alt="" />
          <div className="card_img_single_aside">
            <div className="card_img_single_aside_content">
              <div className="price_card">
                {priceForm.format(item?.price)} ₽
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
                <button className="button_card" onClick={() => add()}>
                  В корзину
                </button>
              </div>
              <div className="bay_card">
                <a href="" className="bay_oneclick_card">
                  Купить в один клик
                </a>
                <button onClick={deleteFromBase}>Удалить</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card_discr">
          <ul className="discrList">
            <li>Описание</li>
            <li>Характеристики</li>
          </ul>
        </div>
        <div className="discr_text">
          <DiscriptionOil />
        </div>
        <Table />
      </div>
    </div>
  );
}
