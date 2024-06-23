import { useContext } from "react";
import { mobxContext } from "../..";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { deleteProductFromFavorites } from "../../http/productAPI";

const FavoriteCard = observer((props) => {
  const { user } = useContext(mobxContext);

  const priceForm = new Intl.NumberFormat();

  async function deleteFormFavorites() {
    await deleteProductFromFavorites(props?.product?.id).then((response) => {
      console.log(response);
      user.setFavoriteProducts(response?.data?.favorite?.favorite_products);
    });
  }

  return (
    // <>
    //   <div>
    //     <h3>fav card</h3>
    //     <button onClick={() => console.log(props)}>props</button>
    //   </div>
    // </>

    <div>
      <div className="wrapper_basket_upper">
        <div className="wrapper_basket">
          <div className="basket_img">
            <Link to={`/product/${props?.product?.product_id}`}>
              <img
                className="basket_img1"
                src={props?.product?.products?.image?.url}
                alt=""
              />
            </Link>
          </div>

          <div className="basket_product_name">
            <Link
              to={`/product/${props?.product?.product_id}`}
              className="name_char_href"
            >
              {props?.product?.products?.brand?.brand_name}{" "}
              {props?.product?.products?.name} {props?.p?.volume}
            </Link>
          </div>
          <div className="basket_price">
            {priceForm.format(props?.product?.products?.price)}₽
          </div>
          <div className="basket_button_delete">
            <button
              className="button_delete"
              //   onClick={() => console.log(props?.product?.id)}
              onClick={deleteFormFavorites}
            >
              X <span id="bsCardSpanDelete">Удалить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FavoriteCard;
