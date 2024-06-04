import { UserContext } from "../../userContext";
import { BasketContext } from "../../basketContext";
import { useContext, useState, useEffect } from "react";
import BasketCard from "../../components/BasketCard";
import { CardFooter } from "../../components/CardFooter";
import "./AccountBasket.css";
import { mobxContext } from "../..";
import { observer } from "mobx-react";

const AccountBasket = observer(() => {
  const { user } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  useEffect(() => {
    getProdFrBask();
  }, []);
  const [userContext, setUserContext] = useContext(UserContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);

  const [items, setItems] = useState();
  const [deliveryPlace, setDeliveryPlace] = useState("");

  //*
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
        // console.log(JSON.parse(response));
        setItems(
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

  function delFromServBasket(id) {
    // console.log(id);
    fetch(
      "http://oilmarket1/delProductFromBasket/?userId=" +
        userContext.id +
        "&productId=" +
        id,
      {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((response) => {
        // console.log(JSON.parse(response));
        // console.log(JSON.parse(response));
        getProdFrBask();
      });
  }

  function increaseCount(id) {
    console.log(id);
  }

  function chengeValueCount(id, value) {
    console.log(id, value);
  }

  let display;
  let item_display;
  let button_display;
  let basketItem;

  let date = new Date();

  if (items) {
    basketItem = items.map((p) => (
      <BasketCard
        key={p.id}
        p={p}
        delFromServerBasket={() => delFromServBasket(p.id)}
        increaseCount={() => increaseCount(p.id)}
        //   dicr={() => dicr(p.id)}
        chengeValueCount={chengeValueCount}
        getProdFrBask={getProdFrBask}
      />
    ));
  }

  if (items) {
    if (items[0]?.name != null) {
      display = "none";
      item_display = "block";
      button_display = "flex";
    } else {
      display = "block";
      item_display = "none";
      button_display = "none";
    }
  }
  let button_disabled;
  let disColor;

  if (!deliveryPlace) {
    button_disabled = true;
    disColor = "grey";
  } else {
    button_disabled = false;
  }

  async function orderLega() {
    let date = new Date();
    let ndate = date.toLocaleString("ru");
    let res = await fetch(
      "http://oilmarket1/addOrder/?userID=" +
        userContext.id +
        "&date=" +
        ndate +
        "&delivery_place=" +
        deliveryPlace
    );
    let ord = await res.json();
    console.log(ord);
  }

  return (
    // <div className="content_wrapper" style={{ minHeight: minHeight }}>
    <>
      <button onClick={() => console.log(order.user_basket_products)}>
        basket log
      </button>

      <div className="content_wrapper">
        <div className="ABasket_head">
          <h2 style={{ display: item_display }}>Корзина товаров</h2>
        </div>

        <div style={{ display: display }}>
          <div className="ABasket_head">
            <h2>Сейчас ваша корзина товаров пуста :(</h2>
          </div>
        </div>
        <div style={{ display: item_display }}>{basketItem}</div>

        {order.user_basket_products &&
          order.user_basket_products.map((product) => (
            <BasketCard key={product.id} product={product} />
          ))}

        <CardFooter />
      </div>
      <div className="form_page_form_conteiner">
        <div style={{ display: item_display }}>
          <label>
            Укажите место доставки:
            <input
              id="delivery_place"
              name="delivery_place"
              className="input_form"
              type="text"
              value={deliveryPlace}
              onChange={(event) => setDeliveryPlace(event.target.value)}
            />
          </label>
          {!deliveryPlace && (
            <div style={{ color: "red", display: item_display }}>
              Необходимо указать место доставки
            </div>
          )}
          <br />
          {/* {badReq && <div className="regErrorBr">{badReq}</div>} */}
          {/* {req && <div className="regSuccessBr">{req}</div>}  */}
          <div style={{ display: button_display }} className="ABasket_head">
            <button
              type="submit"
              // className="order_button"
              className="form_input_button"
              style={{
                // width: "100px",
                // display: "flex",
                // alignItems: "center",
                background: disColor,
              }}
              // onClick={() => alert(new Date())}
              // onClick={() => console.log(basketContext, userContext, new Date())}
              onClick={orderLega}
              disabled={button_disabled}
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default AccountBasket;
