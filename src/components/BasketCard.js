import { useState, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { BasketContext } from "../basketContext";

export function BasketCard(props) {
  let chengeValue = props.chengeValue;
  let chengeValueCount = props.chengeValueCount;
  let getProdFrBask = props.getProdFrBask;
  useEffect(() => {
    getProdFrBask();
  }, []);

  const priceForm = new Intl.NumberFormat();
  const [userContext, setUserContext] = useContext(UserContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);

  const [blur, setBlur] = useState(props?.p?.product_count);
  const [SValue, setSValue] = useState(props?.p?.product_count);

  function updateCountBasket(Value) {
    fetch(
      "http://oilmarket1/updateCountBasket/?productID=" +
        props?.p?.id +
        "&count=" +
        Value +
        "&userID=" +
        userContext.id,
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
  //* увеличение счетчика товара на еденицу
  function incrBlur() {
    const Value = +blur + 1;
    setBlur(+blur + 1);
    setSValue(Value);

    updateCountBasket(Value);
  }

  //* уменьшение счетчика товара на еденицу
  function decrBlur() {
    if (blur > 1) {
      const Value = +blur - 1;
      setBlur(+blur - 1);
      setSValue(Value);

      updateCountBasket(Value);
    }
  }
  //*
  function blurFeth(a, Value) {
    if (Value > 0) {
      setSValue(Value);
      updateCountBasket(Value);
    } else {
      setSValue(1);
      setBlur(1);

      updateCountBasket(1);
    }
  }

  return (
    <div>
      {/* <div className="adaptBasket"></div> */}

      <div className="wrapper_basket_upper">
        <div className="wrapper_basket">
          <div className="basket_img">
            <Link to={`/product/${props?.p?.id}`}>
              <img
                className="basket_img1"
                src={"http://oilmarket1/static/" + props?.p?.img}
                alt=""
              />
            </Link>
          </div>

          <div className="basket_product_name">
            <Link to={`/product/${props?.p?.id}`} className="name_char_href">
              {props.p.manufact} {props?.p?.name}, {props?.p?.volume}
            </Link>
          </div>

          <div className="basket_price">
            {priceForm.format(props?.p?.price)} ₽
          </div>

          <div className="basket_quantity">
            <div className="basket_quantity_inner">
              <button className="decrement" onClick={decrBlur}>
                -
              </button>

              <input
                type={"number"}
                value={+blur}
                onBlur={(_) => blurFeth(props?.p?.id, +blur)}
                onChange={(e) => setBlur(e.target.value)}
                className="quantity_input"
              ></input>

              <button className="increment" onClick={incrBlur}>
                +
              </button>
            </div>
          </div>
          <div className="basket_sum">
            {priceForm.format(props?.p?.price * SValue)} ₽
          </div>

          <div className="basket_button_delete">
            <button
              className="button_delete"
              onClick={props?.delFromServerBasket}
            >
              X<span id="bsCardSpanDelete">Удалить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
