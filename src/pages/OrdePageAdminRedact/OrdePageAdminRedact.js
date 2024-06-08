import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { StatusContext } from "../../context";
import { getOrder, updateOrderStatus } from "../../http/orderAPI";
import moment from "moment";
import { mobxContext } from "../..";
import { observer } from "mobx-react";

const OrdePageAdminRedact = observer(() => {
  const { order } = useContext(mobxContext);

  const router = useParams();
  const rout = router?.id;
  const [productsOrder, setProductsOrder] = useState([]);
  const [orderUserData, setOrderUserData] = useState([]);
  const [newStatus, setNewStatus] = useState(1);
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

  function setNewOrderStatus() {
    fetch(
      "http://oilmarket1/setNewOrderStatus/index.php/?newStatus=" +
        newStatus +
        "&orderID=" +
        rout
    )
      .then((response) => response.json())
      .then((response) => {
        setOrderUserData(response);
      });
  }

  //* lara 08.06.2024
  async function getOrderLara() {
    await getOrder(rout).then((response) => {
      // console.log(response.data);
      setOrderUserData(response?.data);
      // setProductsOrder(response?.data?.order_products);
    });
  }
  async function updateOrderStatusLara() {
    await updateOrderStatus(rout, newStatus).then((response) => {
      // console.log(response);
      setOrderUserData(response?.data);
    });
  }

  useEffect(() => {
    getOrderLara();
  }, []);

  const formattedDate = moment(orderUserData?.created_at).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  return (
    <>
      <h3>
        Заказ {router?.id} от {formattedDate} {orderUserData?.firstName}{" "}
        {orderUserData?.patronymic}
      </h3>
      <div>
        Время заказа: <b>{formattedDate}</b>
      </div>
      <div>
        Номер телефона: <b>{orderUserData?.user?.phone}</b>
      </div>
      <div>
        Почта: <b>{orderUserData?.user?.email}</b>
      </div>
      <div>
        Адрес доставки: <b>{orderUserData?.delivery_place}</b>
      </div>
      <div>
        Статус заказа: <b>{orderUserData?.status?.status_name}</b>
      </div>
      <div>
        ID нового статуса: <b> {newStatus}</b>
      </div>
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
            {order.order_statuses ? (
              order.order_statuses.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.status_name}
                </option>
              ))
            ) : (
              <div>нет данных</div>
            )}
          </select>
        </label>
        <button onClick={updateOrderStatusLara}>Установить статус</button>
      </div>
      {orderUserData?.order_products &&
        orderUserData?.order_products.map((OrdProd) => (
          <OrderCard key={OrdProd.id} p={OrdProd} />
        ))}
    </>
  );
});

export default OrdePageAdminRedact;
