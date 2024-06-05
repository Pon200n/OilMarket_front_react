import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import { deleteProductFromBasket, updateProductBasket } from "../http/orderAPI";
import { observer } from "mobx-react";
import { mobxContext } from "..";

const BasketCard = observer((props) => {
  const { order } = useContext(mobxContext);

  const priceForm = new Intl.NumberFormat();

  const [blur, setBlur] = useState(props?.product?.product_count);
  const [SValue, setSValue] = useState(props?.product?.product_count);

  async function updateProduct(Value) {
    await updateProductBasket(props.product.id, Value).then((response) => {
      console.log(response);
      order.setUserBasketProducts(response.data.basket.basket_products);
    });
  }
  //* увеличение счетчика товара на еденицу
  function incrBlur() {
    const Value = +blur + 1;
    setBlur(+blur + 1);
    setSValue(Value);

    updateProduct(Value);
  }

  //* уменьшение счетчика товара на еденицу
  function decrBlur() {
    if (blur > 1) {
      const Value = +blur - 1;
      setBlur(+blur - 1);
      setSValue(Value);

      updateProduct(Value);
    }
  }
  //*
  function blurFeth(a, Value) {
    if (Value > 0) {
      setSValue(Value);
      updateProduct(Value);
    } else {
      setSValue(1);
      setBlur(1);

      updateProduct(1);
    }
  }

  // **** laravel 04.06.2024
  async function deleteProductFromBasketLara() {
    await deleteProductFromBasket(props.product.id).then((response) => {
      console.log(response);
      order.setUserBasketProducts(response.data.basket.basket_products);
    });
  }

  return (
    <div>
      {/* <div className="adaptBasket"></div> */}

      <div className="wrapper_basket_upper">
        <div className="wrapper_basket">
          <div className="basket_img">
            <Link to={`/product/${props?.product?.product_id}`}>
              <img
                className="basket_img1"
                src={props?.product?.products?.image?.url}
                alt=""
              />
            </Link>
          </div>

          <div className="basket_product_name">
            <Link
              to={`/product/${props?.product?.product_id}`}
              className="name_char_href"
            >
              {props?.product?.products?.brand?.brand_name}{" "}
              {props?.product?.products?.name} {props?.p?.volume}
            </Link>
          </div>

          <div className="basket_price">
            {priceForm.format(props?.product?.products?.price)} ₽
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
            {priceForm.format(props?.product?.products?.price * SValue)} ₽
          </div>

          <div className="basket_button_delete">
            <button
              className="button_delete"
              onClick={deleteProductFromBasketLara}
            >
              X<span id="bsCardSpanDelete">Удалить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default BasketCard;
