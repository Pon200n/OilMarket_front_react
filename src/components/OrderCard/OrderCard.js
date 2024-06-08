import { Link } from "react-router-dom";

export function OrderCard(props) {
  const priceForm = new Intl.NumberFormat();

  return (
    <div>
      <div className="wrapper_basket_upper">
        <div className="wrapper_basket">
          <div className="basket_img">
            <Link to={`/product/${props?.p?.product?.id}`}>
              <img
                className="basket_img1"
                src={props?.p?.product?.image?.url}
                alt=""
              />
            </Link>
          </div>

          <div className="basket_product_name">
            <Link to={`/product/${props?.p?.id}`} className="name_char_href">
              {props?.p?.product?.brand?.brand_name} {props?.p?.product?.name}
            </Link>
          </div>

          <div className="basket_price">
            {priceForm.format(props?.p?.fixed_price)}₽
          </div>

          <div className="basket_quantity">
            <div className="basket_quantity_inner">X {props?.p?.count}</div>
          </div>
          <div className="basket_sum">
            {priceForm.format(props?.p?.fixed_price * props?.p?.count)}₽
          </div>
        </div>
      </div>
    </div>
  );
}
