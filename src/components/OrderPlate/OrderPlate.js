import { useState } from "react";
import { OrderCard } from "../OrderCard/OrderCard.js";
import "./OrderPlate.css";
import moment from "moment";

export function OrderPlate(props) {
  const priceForm = new Intl.NumberFormat();
  const [prodToggle, setProdToggle] = useState(true);

  let totalOrderPrice;
  let totalOrderCount;
  if (props?.order?.order_products) {
    totalOrderPrice = props?.order?.order_products.reduce(
      (sum, item) => sum + item.fixed_price * item.count,
      0
    );
    totalOrderCount = props?.order?.order_products.reduce(
      (sum, item) => sum + item.count,
      0
    );
  }

  const formattedDate = moment(props?.order?.created_at).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  return (
    <>
      <div className="ord_wrap">
        <button onClick={() => console.log(props.order)}>ord log</button>
        <div className="ord">
          Заказ от:
          {formattedDate}
        </div>
        <div className="ord">
          Статус заказа: {props?.order?.status?.status_name}.
        </div>
        <div className="ord_par_price">
          На сумму: {priceForm.format(totalOrderPrice)} ₽
        </div>
        <div
          className="ord_par_prod"
          onClick={() => setProdToggle(!prodToggle)}
        >
          Товары: {totalOrderCount} ед.
        </div>

        {prodToggle && (
          <div>
            {props?.order &&
              props?.order?.order_products.map((OrderProduct) => (
                <OrderCard key={OrderProduct.id} p={OrderProduct} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
