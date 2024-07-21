import "./CardProductGrid.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { addProductToBasket } from "../../http/orderAPI";
import { mobxContext } from "../..";
import { addProductToFavorites } from "../../http/productAPI";

export const CardProductGrid = (props) => {
  const { user } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  const priceForm = new Intl.NumberFormat();

  async function addProductToBasketLara() {
    if (user.isAuth) {
      await addProductToBasket(props.item.id, props.item.price).then(
        (response) => {
          // console.log("basket response", response);
          order.setUserBasketProducts(response.data.basket.basket_products);
          // console.log("mobx order store get", order.user_basket_products);
        }
      );
    } else {
      alert(
        "Пользоваться корзиной могут авторизованные пользователи, пожалуйста зарегистрируйтесь и войдите в аккаунт."
      );
    }
  }
  let productRoute;
  if (user?.role === "admin") {
    productRoute = "/productAdmin/";
  } else {
    productRoute = "/product/";
  }
  async function addToFavorites() {
    if (user.isAuth) {
      await addProductToFavorites(props.item.id).then((response) => {
        // console.log(response)
        user.setFavoriteProducts(response.data.favorite.favorite_products);
      });
    } else {
      alert(
        "Пользоваться 'избранным' могут авторизованные пользователи, пожалуйста зарегистрируйтесь и войдите в аккаунт."
      );
    }
  }
  return (
    <div className="cart_grid">
      <div className="cart_img">
        {/* <Link to={`/product/${props?.item?.id}`}> */}
        <Link to={productRoute + props?.item?.id}>
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
              onClick={addToFavorites}
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
