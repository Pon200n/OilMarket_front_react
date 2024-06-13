import "./CardProductGrid.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BasketContext } from "../../basketContext";
import { UserContext } from "../../userContext";
import { addProductToBasket } from "../../http/orderAPI";
import { mobxContext } from "../..";

export const CardProductGrid = (props) => {
  const { order } = useContext(mobxContext);

  const priceForm = new Intl.NumberFormat();
  const [userContext, setUserContext] = useContext(UserContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);

  // //*Добавить product в корзину на сервер
  // function addToBasketProduct() {
  //   fetch(
  //     "http://oilmarket1/addProductToBasket/?productId=" +
  //       props.item.id +
  //       "&userId=" +
  //       userContext.id,
  //     {
  //       method: "GET",
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.text())
  //     .then((response) => {
  //       console.log("с сервера", JSON.parse(response));

  //       setBasketContext(
  //         JSON.parse(response, function (key, value) {
  //           if (
  //             key === "id" ||
  //             key === "count" ||
  //             key === "product_count" ||
  //             key === "price" ||
  //             key === "priceTotal"
  //           )
  //             return +value;
  //           return value;
  //         })
  //       );
  //     });
  //   alert("товар добавлен в корзину");
  // }
  async function addProductToBasketLara() {
    await addProductToBasket(props.item.id, props.item.price).then(
      (response) => {
        // console.log("basket response", response);
        order.setUserBasketProducts(response.data.basket.basket_products);
        // console.log("mobx order store get", order.user_basket_products);
      }
    );
  }
  return (
    // <div className="cart_mobile_540px">
    <div className="cart_grid">
      <div className="cart_img">
        <Link to={`/product/${props?.item?.id}`}>
          {" "}
          <img className="main_card_img" src={props?.item?.image?.url} alt="" />
        </Link>
      </div>
      <div className="icon_cart_grid">
        <div className="ic_cart_comp">
          <div className="cart_href_copm">
            <img
              src={"/icon/business-and-finance.png"}
              alt=""
              className="img_cr_copm"
            />
          </div>
        </div>
        <div className="ic_cart_fav">
          <div className="cart_href_fav">
            <img
              src={"/icon/add-to-favorites--v1.png"}
              alt=""
              className="img_cr_fav"
            />
          </div>
        </div>
      </div>
      <div className="discr">
        <div className="oil_category">
          {props?.item?.category?.category_name}
        </div>
        <div className="name_char">
          <Link to={`/product/${props.item.id}`} className="name_char_href">
            {" "}
            {props?.item?.brand?.brand_name} {props.item.name}
          </Link>
        </div>
        <div className="price">{priceForm.format(props.item.price)} ₽</div>
        <div className="but_bask">
          <button onClick={addProductToBasketLara}>В корзину</button>
        </div>
      </div>
    </div>
  );
};
export default CardProductGrid;
