import { useParams } from "react-router-dom";
import { Table } from "../../components/CharTable/CharTable";
import { useContext, useState, useEffect } from "react";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../http/productAPI";
import { mobxContext } from "../..";
import { observer } from "mobx-react";
import { addProductToBasket } from "../../http/orderAPI";
import ValueSelectBarLara from "../../components/ValueSelectBarLara/ValueSelectBarLara";
import { toJS } from "mobx";

const AdminProductPage = observer(() => {
  const { product } = useContext(mobxContext);
  const { user } = useContext(mobxContext);
  const { service } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  const router = useParams();
  const rout = router.id;

  const [discrToggle, setDiscrToggle] = useState(false);
  const [charTableToggle, setCharTableToggle] = useState(false);

  const [item, setitem] = useState();
  const priceForm = new Intl.NumberFormat();

  // *** LARA 26.05.2024
  async function getProductLara() {
    await getProduct(rout).then((response) => {
      setitem(response.data);
    });
  }
  async function addProductToBasketLara() {
    await addProductToBasket(item.id, item.price).then((response) => {
      // console.log("basket response", response);
      order.setUserBasketProducts(response.data.basket.basket_products);
      // console.log("mobx order store get", order.user_basket_products);
    });
  }
  async function del() {
    const qvest = window.confirm("Хотите удалить карточку товара?");
    if (qvest) {
      try {
        await deleteProduct(rout).then((response) => {
          product.setProducts(response.data);
          alert(response.status);
        });
      } catch (error) {
        service.setErrorMessage(error.message);
      }
    }
  }

  function toJsonValues() {
    const plainArray = toJS(product.productValues);
    console.log("plainArray", plainArray);
    let newPlain = plainArray.map((obj) => {
      return { ...obj, product_id: item.id };
    });
    // console.log("newPlain", newPlain);
    const values = JSON.stringify(newPlain);
    console.log("values", values);
  }

  async function updateProductLara() {
    const plainArray = toJS(product.productValues);
    let newPlain = plainArray.map((obj) => {
      return { ...obj, product_id: item.id };
    });
    const values = JSON.stringify(newPlain);
    await updateProduct(item.id, values).then((response) => {
      console.log(response);
    });
  }

  useEffect(() => {
    getProductLara();
  }, []);
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [categoryName, setCategoryName] = useState("");
  const [brand, setBrand] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(0);
  const [values, setValues] = useState([]);
  const [description, setDescription] = useState("");

  let filtratedChars;
  if (product.categories) {
    filtratedChars = product.chars.filter((char) => {
      if (char?.category_id === +category) {
        return char;
      }
    });
  }
  return (
    <>
      <div className="card_center" style={{ backgroundColor: "grey" }}>
        <div className="form_page_form_conteiner">
          <div>
            <label>
              Название:
              <input
                id="name"
                name="name"
                className="input_form"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <br />
            <label>
              Категория:
              <select
                id="category"
                name="category"
                // defaultValue={categoryContext.category_name}
                className="input_form"
                onChange={(event) => {
                  const selectedIndex = event.target.selectedIndex;
                  const selectedOption = event.target.options[selectedIndex];
                  setCategory(selectedOption.value);
                  setCategoryName(selectedOption.text);
                  //   console.log("selectedIndex", selectedIndex);
                  //   console.log("selectedOption.text", selectedOption.text);
                }}
              >
                <option value=""></option>
                {product.categories ? (
                  product.categories.map((x) => (
                    <option value={x.id} key={x.id}>
                      {x.category_name}
                    </option>
                  ))
                ) : (
                  <div>нет данных</div>
                )}
              </select>
            </label>
            <br />
            <label>
              Производитель:
              <select
                id="brand"
                name="brand"
                className="input_form"
                onChange={(event) => {
                  setBrand(event.target.value);
                  const selectedIndex = event.target.selectedIndex;
                  const selectedOption = event.target.options[selectedIndex];
                  setBrand(selectedOption.value);
                  setBrandName(selectedOption.text);
                }}
              >
                <option></option>
                {product.brands ? (
                  product.brands.map((x) => (
                    <option value={x.id} key={x.id}>
                      {x.brand_name}
                    </option>
                  ))
                ) : (
                  <div>нет данных</div>
                )}
              </select>
            </label>
            <br />

            <label>
              Цена:
              <input
                id="price"
                name="price"
                className="input_form"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </label>
            <br />
            <label>
              Описание товара:
              <textarea
                id="description"
                name="description"
                className="input_form"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <br />
            {filtratedChars &&
              filtratedChars.map((char) => (
                <div style={{ margin: "10px" }} key={char?.id}>
                  <label>
                    {char?.char_name} {char?.id}
                  </label>
                  <ValueSelectBarLara v={values} char={char} />
                </div>
              ))}
            <br />
            <button className="form_input_button" onClick={updateProductLara}>
              Обновить
            </button>
          </div>
        </div>
        {item ? (
          <div className="cart_single">
            <div className="name_char_single">
              {categoryName == ""
                ? item?.category?.category_name
                : categoryName}{" "}
              {brandName == "" ? item?.brand?.brand_name : brandName}{" "}
              {name == "" ? item?.name : name}
            </div>
            <div className="cart_img_single">
              <img className="img_single" src={item?.image?.url} alt="" />
              <div className="card_img_single_aside">
                <div className="card_img_single_aside_content">
                  <div className="price_card">
                    {price == "" ? priceForm.format(item?.price) : price} ₽
                  </div>
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
                  <div className="but_bask_card"></div>
                  <div className="bay_card">
                    <button onClick={del}>Удалить товар</button>

                    <br />
                    <button
                      className="bay_oneclick_card"
                      onClick={addProductToBasketLara}
                    >
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card_discr">
              <ul className="discrList">
                <li
                  className="discrButton"
                  onClick={() => setDiscrToggle(!discrToggle)}
                >
                  Описание
                </li>
                <li
                  className="discrButton"
                  onClick={() => setCharTableToggle(!charTableToggle)}
                >
                  {charTableToggle ? "Скрыть " : "Показать "}характеристики
                </li>
              </ul>
            </div>
            {discrToggle && (
              <div className="discr_text">
                <p className="tt">
                  {description == "" ? item?.info?.description : description}
                </p>
              </div>
            )}
            <button onClick={() => console.log(item.values)}>
              <h3>item.values</h3>
            </button>
            <button onClick={() => console.log(product.productValues)}>
              <h3>productValues</h3>
            </button>
            <button onClick={toJsonValues}>
              <h3>toJsonValues</h3>
            </button>
            {charTableToggle && <Table charsLara={item.values} />}
          </div>
        ) : (
          <h1>none</h1>
        )}
      </div>
    </>
  );
});
export default AdminProductPage;
