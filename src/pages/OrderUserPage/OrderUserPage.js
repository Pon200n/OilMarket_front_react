import "./OrderUserPage.css";
import { UserContext } from "../../userContext";
import { useContext, useEffect, useState } from "react";
import { OrderPlate } from "../../components/OrderPlate/OrderPlate";
export function OrderUserPage() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  // let footHeight = document.querySelector("footer").offsetHeight;
  // let headHeight = document.querySelector(".main_header").offsetHeight;
  // let docHeigth = document.documentElement.clientHeight;
  // let minHeight = docHeigth - (footHeight + headHeight);
  function getUserOrders() {
    fetch("http://oilmarket1/getUserOrders/?userID=" + userContext.id, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setOrders(response);
      });
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <div className="content_wrapper">
      <h2 className="head">История заказов</h2>
      {/* <button onClick={getUserOrders}>getOrders</button> */}
      {/* {orders &&
        orders.map((order) => (
          <div key={order.id}>Заказ от: {order?.order_time}</div>
        ))} */}
      {orders && orders.map((order) => <OrderPlate key={order.id} p={order} />)}
    </div>
  );
}
