import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { StatusContext } from "../../context";
export function OrdePageAdminRedact() {
  const router = useParams();
  const rout = router?.id;
  const [productsOrder, setProductsOrder] = useState([]);
  const [orderUserData, setOrderUserData] = useState([]);
  const [newStatus, setNewStatus] = useState();
  const [statusContext, setStatusContext] = useContext(StatusContext);

  function getOrderDataByID() {
    fetch("http://oilmarket1/getOrderDataByID/index.php/?orderID=" + rout)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.user_data);
        setOrderUserData(response.user_data);
        setProductsOrder(response.order_data);
      });
  }
  console.log(statusContext);
  useEffect(() => {
    getOrderDataByID();
  }, []);
  function setNewOrderStatus() {
    fetch(
      "http://oilmarket1/setNewOrderStatus/index.php/?newStatus=" +
        newStatus +
        "&orderID=" +
        rout
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setOrderUserData(response);
      });
  }
  return (
    <>
      <h3>
        Заказ {router?.id} от {orderUserData?.lastName}{" "}
        {orderUserData?.firstName} {orderUserData?.patronymic}
      </h3>
      <div>Время заказа(устройство): {orderUserData?.order_user_time}</div>
      <div>Время заказа(сервер): {orderUserData?.order_server_time}</div>
      <div>Номер телефона: {orderUserData?.phone}</div>
      <div>Почта: {orderUserData?.eMail}</div>
      <div>Адрес доставки: {orderUserData?.delivery_place}</div>
      <div>Статус заказа: {orderUserData?.order_status_description}</div>
      <div>ID нового статуса: {newStatus}</div>
      <div>
        <label>
          Установить статус:
          <select
            id="category"
            name="category"
            // defaultValue={statusContext.id}
            className="input_form"
            onChange={(event) => setNewStatus(event.target.value)}
          >
            {statusContext ? (
              statusContext.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.order_status_description}
                </option>
              ))
            ) : (
              <div>нет данных</div>
            )}
          </select>
        </label>
        <button onClick={setNewOrderStatus}>Установить статус</button>
      </div>
      <button onClick={getOrderDataByID}>getOrder</button>
      {productsOrder &&
        productsOrder.map((OrdProd) => (
          <OrderCard key={OrdProd.id} p={OrdProd} />
        ))}
    </>
  );
}
