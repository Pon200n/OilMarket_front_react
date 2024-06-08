import { useContext } from "react";
import { mobxContext } from "..";
import { BasketContext } from "../basketContext";
import { observer } from "mobx-react";

const CardFooter = observer(() => {
  const { order } = useContext(mobxContext);

  let totalBasketCountLara = order.user_basket_products.reduce(
    (sum, item) => sum + item?.product_count,
    0
  );

  let totalBasketPriceLara = order.user_basket_products.reduce(
    (sum, item) => sum + item?.fixed_price * item?.product_count,
    // (sum, item) => sum + item.products.price * item.product_count,
    0
  );
  const [basketContext, setBasketContext] = useContext(BasketContext);
  let totalBasketCount = basketContext.reduce(
    (sum, item) => sum + item.product_count,
    0
  );
  let totalBasketPrice = basketContext.reduce(
    (sum, item) => sum + item.price * item.product_count,
    0
  );
  const priceForm = new Intl.NumberFormat();
  // const [context, setContext] = useContext(Context);
  // let totalBasketCount = context.reduce((sum, item) => sum + item.count, 0);
  // let totalBasketPrice = context.reduce(
  //   (sum, item) => sum + item.priceTotal,
  //   0
  // );
  // console.log("context", context);

  // const priceForm = new Intl.NumberFormat();

  let display;
  if (totalBasketCount > 0) {
    display = "block";
  } else {
    display = "none";
  }
  return (
    <div>
      {order?.user_basket_products?.length > 0 && (
        <div className="cardFooter">
          <div className="cardFooter_totalCount">
            <h4>В корзине сейчас товаров {totalBasketCountLara} ед.</h4>
          </div>
          <div className="cardFooter_totalBasketPrice">
            <h4>на сумму {priceForm.format(totalBasketPriceLara)} ₽</h4>
          </div>
        </div>
      )}
    </div>
  );
});
export default CardFooter;
