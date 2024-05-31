import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context";
import { CategBrndPlate } from "../../components/CategBrndPlate/CategBrndPlate";
import "./AddCategory.css";
import { AllCharsValuesContext } from "../../context";
import { AllCharsNamesContext } from "../../context";
import { UserContext } from "../../userContext";
import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { addCategoryLara } from "../../http/productAPI";

export const AddCategory = observer(() => {
  const { product } = useContext(mobxContext);

  const [category, setCategoryInput] = useState();
  const [req, setReq] = useState();
  const [badReq, setBadReq] = useState();
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  const [allCharsNamesContext, setAllCharsNamesContext] =
    useContext(AllCharsNamesContext);
  let disabled;
  let disColor;
  if (!category) {
    disabled = true;
    disColor = "grey";
  }

  // function getAllChars() {
  //   fetch("http://oilmarket1/getAllChars/index.php")
  //     .then((response) => response.json())
  //     .then((response) => {
  //     });
  // }

  useEffect(() => {
    setBadReq(false);
    setReq(false);
    // getAllChars();
  }, [category]);
  async function addCategoryToDB() {
    let response = await fetch(
      "http://oilmarket1/addCategory/index.php/?category=" + category
    );

    let res = await response.json();
    let status = await res.status;
    let msg = await res.msg;
    let arr = await res?.array;
    if (status === "ok") {
      setReq(msg);
      setBadReq(false);
      setCategoryContext(arr);
    } else {
      setBadReq(msg);
      setReq(false);
    }
  }
  // * новый запрос на получение категорий
  let filterID = 1;
  const [newCat, setNewCat] = useState();
  if (newCat != undefined) {
    let filtretedNewCat = newCat.filter((f) => {
      return f.id === filterID;
    });
    let CHARS_OF_filtretedNewCat = filtretedNewCat[0].chars;
  }

  function newGetCategories() {
    fetch("http://127.0.0.1:8000/categories")
      .then((response) => response.json())
      .then((response) => {
        setNewCat(response.data);
      });
  }
  // * новый запрос на добавление категории

  async function newAddCat() {
    await addCategoryLara(category).then((response) => {
      product.setCategories(response.data.data);
      setCategoryInput("");
    });
  }

  useEffect(() => {
    newGetCategories();
  }, []);
  // *********************************
  return (
    <>
      {/* <h3>{category}</h3> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Добавить категорию</h2>
      </div>
      <div className="form_page_form_conteiner">
        <div>
          <label>
            Категория:
            <input
              id="category"
              name="category"
              className="input_form"
              type="text"
              value={category}
              onChange={(event) => setCategoryInput(event.target.value)}
            />
          </label>
          {!category && (
            <div style={{ color: "red" }}>Необходимо заполнить поле</div>
          )}
          <br />
          {badReq && <div className="regErrorCat">{badReq}</div>}
          {req && <div className="regSuccessCat">{req}</div>}
          {/* <button
            type="submit"
            className="form_input_button"
            onClick={addCategoryToDB}
            disabled={disabled}
            style={{ background: disColor }}
            // style={styleContainer}
          >
            Добавить
          </button> */}
          <button
            type="submit"
            className="form_input_button"
            onClick={newAddCat}
            disabled={disabled}
            style={{ background: disColor }}
            // style={styleContainer}
          >
            Добавить
          </button>
        </div>
      </div>
      {/* <h2 style={{ display: "flex", justifyContent: "center" }}>Категории</h2>

      {categoryContext ? (
        categoryContext.map((item) => (
          <CategBrndPlate key={item.id} item={item} />
        ))
      ) : (
        <div>нет данных</div>
      )} */}
      <h2 style={{ display: "flex", justifyContent: "center" }}>Категории</h2>

      {product.categories ? (
        product.categories.map((item) => (
          <CategBrndPlate key={item.id} item={item} />
        ))
      ) : (
        <div>нет данных</div>
      )}
    </>
  );
});
