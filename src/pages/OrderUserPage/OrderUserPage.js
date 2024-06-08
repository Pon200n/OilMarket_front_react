import "./OrderUserPage.css";
import { useContext } from "react";
import { OrderPlate } from "../../components/OrderPlate/OrderPlate";
import { mobxContext } from "../..";
import { observer } from "mobx-react";

const OrderUserPage = observer(() => {
  const { user } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  return (
    <div className="content_wrapper">
      <button onClick={() => console.log(order.user_basket_products)}>
        order log
      </button>
      <h2 className="head">История заказов</h2>

      {user.orders.length > 0 &&
        user.orders.map((order) => <OrderPlate key={order.id} order={order} />)}
    </div>
  );
});
export default OrderUserPage;
