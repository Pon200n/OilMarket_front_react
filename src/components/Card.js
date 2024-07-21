import { Link } from "react-router-dom";
import { useContext } from "react";
import { observer } from "mobx-react";

import { addProductToBasket } from "../http/orderAPI";
import { mobxContext } from "..";

const Card = observer((props) => {
  const { user } = useContext(mobxContext);
  const { order } = useContext(mobxContext);
  const priceForm = new Intl.NumberFormat();

  async function addProductToBasketLara() {
    console.log(user.isAuth);
    if (user.isAuth) {
      await addProductToBasket(props.item.id, props.item.price).then(
        (response) => {
          console.log("basket response", response);
          order.setUserBasketProducts(response.data.basket.basket_products);
          // console.log("mobx order store get", order.user_basket_products);
        }
      );
    } else {
      alert(
        "Пользоваться корзиной и избранным могут авторизованные пользователи, пожалуйста зарегистрируйтесь и войдите в аккаунт."
      );
    }
  }

  return (
    <div className="cart_mobile_540px">
      <div className="cart">
        <div className="cart_img">
          <Link to={`/product/${props.item.id}`}>
            {" "}
            <img
              className="main_card_img"
              src={props?.item?.image?.url}
              alt=""
            />
          </Link>
        </div>
        <div className="icon_cart">
          <div className="ic_cart_comp">
            <div className="cart_href_copm">
              <img
                src="/icon/business-and-finance.png"
                alt=""
                className="img_cr_copm"
              />
            </div>
          </div>
          <div className="ic_cart_fav">
            <div className="cart_href_fav">
              <img
                src="/icon/add-to-favorites--v1.png"
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
              {props?.item?.brand?.brand_name} {props.item.name}{" "}
              {props.item.SAE} {props.item.volume}
            </Link>
          </div>
          <div className="price">{priceForm.format(props.item.price)} ₽</div>
          <div className="but_bask">
            <button onClick={addProductToBasketLara}>В корзину</button>
            <button onClick={() => console.log("log")}>В log</button>
          </div>
          {/* <div className="bay">
          <a href="" className="bay_oneclick">
            Купить в один клик
          </a>
        </div> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
});
export default Card;
