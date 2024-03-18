// import { useState, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
// import { UserContext } from "../userContext";
// import { BasketContext } from "../basketContext";

export function OrderCard(props) {
  const priceForm = new Intl.NumberFormat();

  return (
    <div>
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
              X{props?.p?.product_count}
              {/* <button className="decrement" onClick={decrBlur}>
                -
              </button> */}
              {/* <input
                type={"number"}
                value={+blur}
                onBlur={(_) => blurFeth(props?.p?.id, +blur)}
                onChange={(e) => setBlur(e.target.value)}
                className="quantity_input"
              ></input> */}
              {/* <button className="increment" onClick={incrBlur}>
                +
              </button> */}
            </div>
          </div>
          <div className="basket_sum">
            {priceForm.format(props?.p?.price * props?.p?.product_count)} ₽
          </div>

          {/* <div className="basket_button_delete">
            <button
              className="button_delete"
              onClick={props?.delFromServerBasket}
            >
              X<span id="bsCardSpanDelete">Удалить</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
