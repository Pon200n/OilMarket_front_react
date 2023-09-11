import { useParams } from "react-router-dom";
import { items } from "../components/products";
import { Table } from "../components/charTable";
import { DiscriptionOil } from "../components/product_disription";
import { useContext } from "react";
import { Context } from "../context";

export function ProductCard() {
  const router = useParams();
  const priceForm = new Intl.NumberFormat();
  let item = items.find((item) => item.id == router.id);

  const [context, setContext] = useContext(Context);
  function add() {
    let findProduct = context.find((it) => it.id == item.id);
    if (item.id === findProduct?.id) {
      alert("Этот товар уже есть в козине");
    } else {
      context.push({ ...item });
      setContext([...context]);
    }
  }

  return (
    <div className="card_center">
      <div className="cart_single">
        <div className="name_char_single">
          {item.category} {item.manufact} {item.name} {item.SAE}, {item.volume}
        </div>
        <div className="cart_img_single">
          <img className="img_single" src={item.imgCard} alt="" />
          <div className="card_img_single_aside">
            <div className="card_img_single_aside_content">
              <div className="price_card">{priceForm.format(item.price)} ₽</div>
              <div className="fav">
                <a href="#" className="btn_2_card">
                  <img
                    src="/icon/free-icon-star-126482.png"
                    width="20px"
                    height="20px"
                    alt=""
                  />
                  Избранное
                </a>
              </div>
              <div className="comp">
                <a href="#" className="btn_2_card">
                  <img
                    src="/icon/business-and-finance.png"
                    width="20px"
                    height="20px"
                    alt=""
                  />
                  Сравнение
                </a>
              </div>
              <div className="but_bask_card">
                <button className="button_card" onClick={() => add()}>
                  В корзину
                </button>
              </div>
              <div className="bay_card">
                <a href="" className="bay_oneclick_card">
                  Купить в один клик
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card_discr">
          <ul className="discrList">
            <li>Описание</li>
            <li>Характеристики</li>
          </ul>
        </div>
        <div className="discr_text">
          <DiscriptionOil />
        </div>
        <Table />
      </div>
    </div>
  );
}
