import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context";
import { CategBrndPlate } from "../../components/CategBrndPlate/CategBrndPlate";
import "./AddCategory.css";
import { AllCharsValuesContext } from "../../context";
import { AllCharsNamesContext } from "../../context";
import { UserContext } from "../../userContext";

export function AddCategory() {
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
  //       console.log("все характеристики ответ", response);
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
    // console.log(res);
    let status = await res.status;
    let msg = await res.msg;
    let arr = await res?.array;
    console.log(status, msg, arr);
    if (status === "ok") {
      setReq(msg);
      setBadReq(false);
      setCategoryContext(arr);
    } else {
      setBadReq(msg);
      setReq(false);
    }
  }
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
          <button
            type="submit"
            className="form_input_button"
            onClick={addCategoryToDB}
            disabled={disabled}
            style={{ background: disColor }}
            // style={styleContainer}
          >
            Добавить
          </button>
        </div>
      </div>
      <h2 style={{ display: "flex", justifyContent: "center" }}>Категории</h2>

      {categoryContext ? (
        categoryContext.map((item) => (
          <CategBrndPlate key={item.id} item={item} />
        ))
      ) : (
        <div>нет данных</div>
      )}
    </>
  );
}
