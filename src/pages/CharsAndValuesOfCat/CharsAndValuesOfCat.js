import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharPlate } from "../../components/CharPlate/CharPlate";
import { AllCharsValuesContext } from "../../context";
import { AllCharsNamesContext } from "../../context";
import { CategoryContext } from "../../context";
import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { addCharLara } from "../../http/productAPI";
const CharsAndValuesOfCat = observer(() => {
  const { product } = useContext(mobxContext);

  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  const [allCharsNamesContext, setAllCharsNamesContext] =
    useContext(AllCharsNamesContext);

  const [categoryContext, setCategoryContext] = useContext(CategoryContext);

  const [char, setChar] = useState();

  const router = useParams();
  const rout = router.id;
  // console.log(rout);
  // console.log("categoryContext", categoryContext);

  let findCatObj = categoryContext.filter((cat) => {
    return cat?.id == rout;
  });
  // let findCat = findCatObj[0].category_name;

  //   function getChars() {
  //     fetch("http://oilmarket1/getCharNameOfCatID/index.php/?categoryID=" + rout)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         let chars = response?.chars;
  //         let all_chars = response?.all_chars;
  //         let values_res = response?.values;
  //         console.log("response", response);
  //         console.log("values", values_res);
  //         console.log("chars", chars);
  //         // setCharsNames(chars);
  //         setAllCharsValuesContext(all_chars);
  //         setAllCharsNamesContext(values_res);
  //       });
  //   }
  //   console.log(allCharsValuesContext);
  // console.log("allCharsNamesContext", allCharsNamesContext);

  let filtredCharsByCat = allCharsNamesContext.filter((c) => {
    if (c.category_id == rout) {
      return c;
    }
  });
  // console.log(filtredCharsByCat);
  //   useEffect(() => {
  //     getChars();
  //   }, []);
  function addCharToDB() {
    fetch(
      "http://oilmarket1/addChar/index.php/?categoryID=" +
        rout +
        "&charName=" +
        char
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        setAllCharsNamesContext(response);
      });
    // console.log(char);
    // console.log(rout);
  }

  let disabled;
  let disColor;
  if (!char) {
    disabled = true;
    disColor = "grey";
  }

  // * lega   get chars from lara**************
  function newGetCategories() {
    fetch("http://127.0.0.1:8000/categories")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setNewCat(response.data);
      });
  }

  // let filterID = 1;
  let cat;
  let CHARS_OF_filtretedNewCat;
  const [newCat, setNewCat] = useState();
  if (newCat != undefined) {
    let filtretedNewCat = newCat.filter((f) => {
      return f.id == rout;
    });
    cat = newCat.find((item) => item.id == rout);
    console.log("cat", cat.category_name);
    console.log("filtretedNewCat", filtretedNewCat);
    CHARS_OF_filtretedNewCat = filtretedNewCat[0].chars;
    console.log("CHARS_OF_filtretedNewCat", CHARS_OF_filtretedNewCat);
  }
  useEffect(() => {
    newGetCategories();
    newGetChars();
  }, []);
  const [newChars, setNewChars] = useState();
  function newGetChars() {
    fetch("http://127.0.0.1:8000/chars")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setNewChars(response.data);
      });
  }
  let filtretedNewChars;
  if (newChars != undefined) {
    filtretedNewChars = newChars.filter((f) => {
      return f.category_id == rout;
    });
    console.log("filtretedNewChars", filtretedNewChars);
  }

  function addNewChar() {
    fetch(
      "http://127.0.0.1:8000/char_create?char_name=" +
        char +
        "&category_id=" +
        rout
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("neeed tosee", response.data);
        setNewChars(response.data);
        filtretedNewChars = response.data;
        // setNewChars(response.data);
      });
  }

  // *  new add chrs lara
  let filtedChars;
  if (product.chars != undefined) {
    filtedChars = product.chars.filter((f) => {
      return f.category_id == rout;
    });
  }

  async function addNewCharLara() {
    await addCharLara(char, rout).then((response) => {
      product.setChars(response.data.data);
    });
  }

  // *****************************************
  return (
    <>
      {/* <h3>Категория: {findCat}</h3> */}
      {cat && <h3>Категория: {cat.category_name}</h3>}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Добавить характеристику</h2>
      </div>
      <div className="form_page_form_conteiner">
        <div>
          <label>
            Новая характеристика:
            <input
              id="char"
              name="char"
              className="input_form"
              type="text"
              value={char}
              onChange={(event) => setChar(event.target.value)}
            />
          </label>
          {!char && (
            <div style={{ color: "red" }}>Необходимо заполнить поле</div>
          )}
          <br />
          {/* {badReq && <div className="regErrorCat">{badReq}</div>}
          {req && <div className="regSuccessCat">{req}</div>} */}
          {/* <button
            type="submit"
            className="form_input_button"
            onClick={addCharToDB}
            disabled={disabled}
            style={{ background: disColor }}
            // style={styleContainer}
          >
            Добавить
          </button> */}
          <button
            type="submit"
            className="form_input_button"
            onClick={addNewCharLara}
            disabled={disabled}
            style={{ background: disColor }}
            // style={styleContainer}
          >
            Добавить
          </button>
        </div>
      </div>

      {/* {filtredCharsByCat &&
        filtredCharsByCat.map((char) => (
          <div key={char.id}>{char?.char_name}</div>
        ))} */}
      {/* {filtredCharsByCat &&
        filtredCharsByCat.map((char) => <CharPlate key={char.id} c={char} />)}
      <h3>новые характреристики</h3>
      {CHARS_OF_filtretedNewCat &&
        CHARS_OF_filtretedNewCat.map((char) => (
          <CharPlate key={char.id} c={char} />
        ))} */}
      {filtedChars &&
        filtedChars.map((char) => <CharPlate key={char.id} c={char} />)}
    </>
  );
});
export default CharsAndValuesOfCat;
