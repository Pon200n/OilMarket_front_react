import { UserContext } from "../../userContext";
import { useContext, useState } from "react";
import BasketCard from "../../components/BasketCard";
import CardFooter from "../../components/CardFooter";
import "./AccountBasket.css";
import { mobxContext } from "../..";
import { observer } from "mobx-react";
import { addOrder } from "../../http/orderAPI";

const AccountBasket = observer(() => {
  const { user } = useContext(mobxContext);
  const { order } = useContext(mobxContext);
  const [deliveryPlace, setDeliveryPlace] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  //*

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
  // * lara 07.06.2024
  async function addOrderLara() {
    await addOrder(deliveryPlace).then((response) => {
      console.log(response);
      user.setOrders(response.data);
    });
  }
  return (
    <>
      <button onClick={() => console.log(order.user_basket_products)}>
        basket log
      </button>

      <div className="content_wrapper">
        {order.user_basket_products.length > 0 && (
          <div className="ABasket_head">
            <h2>Корзина товаров</h2>
          </div>
        )}

        {order.user_basket_products.length == 0 && (
          <div className="ABasket_head">
            <h2>Сейчас ваша корзина товаров пуста.</h2>
          </div>
        )}

        {/* <div style={{ display: item_display }}>{basketItem}</div> */}

        {order.user_basket_products &&
          order.user_basket_products.map((product) => (
            <BasketCard key={product.id} product={product} />
          ))}

        <CardFooter />
      </div>
      <div className="form_page_form_conteiner">
        {order.user_basket_products.length > 0 && (
          <div>
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
              <div style={{ color: "red" }}>
                Необходимо указать место доставки
              </div>
            )}
            <br />
            {/* {badReq && <div className="regErrorBr">{badReq}</div>} */}
            {/* {req && <div className="regSuccessBr">{req}</div>}  */}
            <div className="ABasket_head">
              <button
                type="submit"
                className="form_input_button"
                style={{
                  background: disColor,
                }}
                // onClick={orderLega}
                onClick={addOrderLara}
                disabled={button_disabled}
              >
                Заказать
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default AccountBasket;
