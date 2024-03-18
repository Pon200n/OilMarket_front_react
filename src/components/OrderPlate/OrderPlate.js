import { useEffect, useState } from "react";
import { OrderCard } from "../OrderCard/OrderCard.js";
import "./OrderPlate.css";
export function OrderPlate(props) {
  const priceForm = new Intl.NumberFormat();
  const [productsOrder, setProductsOrder] = useState();
  const [prodToggle, setProdToggle] = useState(true);
  console.log(props);
  async function getProductsOfOrderByOrderID() {
    let res = await fetch(
      "http://oilmarket1/getProductsOfOrderByOrderID/?order_id=" + props?.p?.id
    );
    let prod = await res.json();
    // console.log(prod);
    setProductsOrder(prod);
  }
  useEffect(() => {
    getProductsOfOrderByOrderID();
  }, []);
  let totalOrderPrice;
  let totalOrderCount;
  if (productsOrder) {
    totalOrderPrice = productsOrder.reduce(
      (sum, item) => sum + item.price * item.product_count,
      0
    );
    totalOrderCount = productsOrder.reduce(
      (sum, item) => sum + item.product_count,
      0
    );
  }
  return (
    <>
      <div className="ord_wrap">
        <div className="ord">
          Заказ от:
          {props?.p?.order_server_time}
        </div>
        <div className="ord">
          Статус заказа: {props?.p?.order_status_description}.
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
        {/* <button onClick={() => setProdToggle(!prodToggle)}>tog</button> */}
        {/* {productsOrder &&
        productsOrder.map((OrdProd) => (
          <div key={OrdProd.id}>{OrdProd.name + " " + OrdProd.manufact}</div>
        ))} */}
        {prodToggle && (
          <div>
            {productsOrder &&
              productsOrder.map((OrdProd) => (
                <OrderCard key={OrdProd.id} p={OrdProd} />
              ))}
            {/* <button onClick={getProductsOfOrderByOrderID}>get</button> */}
          </div>
        )}
      </div>
    </>
  );
}
