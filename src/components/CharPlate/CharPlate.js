import { useEffect } from "react";
import { useState, useContext } from "react";
import { AllCharsNamesContext } from "../../context";
import { AllCharsValuesContext } from "../../context";
import { ValueOfCharPlate } from "../../components/ValueOfCharPlate/ValueOfCharPlate.js";
import { mobxContext } from "../..";

import "../CharPlate/CharPlate.css";
import { deleteCharLara, updateCharLara } from "../../http/productAPI";
export function CharPlate(props) {
  const { product } = useContext(mobxContext);
  const [redToggle, setRedToggle] = useState(false);
  const [valueToggle, setValueToggle] = useState(false);
  const [newChar, setNewChar] = useState();
  const [allCharsNamesContext, setAllCharsNamesContext] =
    useContext(AllCharsNamesContext);
  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  function delCharByID() {
    let conf = window.confirm("Хотите удалить характеристику");
    if (conf) {
      fetch("http://oilmarket1/delCharByID/index.php/?charID=" + props?.c?.id)
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          setAllCharsNamesContext(response);
        });
    }
  }
  function updateCharLega() {
    let conf = window.confirm(
      `Хотите изменить название характеристики на '${newChar}'?`
    );
    if (conf) {
      fetch(
        "http://oilmarket1/updateChar/index.php/?charID=" +
          props?.c?.id +
          "&newCharName=" +
          newChar +
          "&categoryID=" +
          props?.c?.category_id
      )
        .then((response) => response.json())
        .then((response) => {
          // console.log("req", response);
          setAllCharsNamesContext(response);
        });
      setRedToggle(false);
    }
  }
  let disabled;
  if (!newChar) {
    disabled = "disabled";
  }
  useEffect(() => {
    setNewChar();
  }, [redToggle]);
  // *** lara*********
  function NEWupdateChar() {
    let conf = window.confirm(
      `Хотите изменить название характеристики на '${newChar}'?`
    );
    if (conf) {
      fetch(
        "http://127.0.0.1:8000/update_char/" +
          props?.c?.id +
          "?char_name=" +
          newChar
      )
        .then((response) => response.json())
        .then((response) => {
          console.log("req", response);
          // setAllCharsNamesContext(response);
        });
      setRedToggle(false);
    }
  }
  function NEWdelCharByID() {
    let conf = window.confirm("Хотите удалить характеристику");
    if (conf) {
      fetch("http://127.0.0.1:8000/destroy_char/" + props?.c?.id)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          // setAllCharsNamesContext(response);
        });
    }
  }

  async function updateChar() {
    let conf = window.confirm(
      `Хотите изменить название характеристики на '${newChar}'?`
    );
    if (conf) {
      try {
        await updateCharLara(props?.c?.id, newChar).then((response) => {
          product.setChars(response.data.data);
        });
      } catch (e) {
        alert(e.message);
      }
    }
  }

  async function deleteChar() {
    let conf = window.confirm("Хотите удалить характеристику");
    if (conf) {
      try {
        await deleteCharLara(props?.c?.id).then((response) => {
          product.setChars(response.data.data);
        });
      } catch (e) {
        alert(e.message);
      }
    }
  }
  // *end
  return (
    <div className="value_wrapper">
      <div className="value_pl_item2">
        <div className="value_pl_item">
          <div style={{ marginRight: "3vw" }}>{props?.c?.char_name}</div>
          <button onClick={deleteChar}>Удалить</button>
          <button onClick={() => setRedToggle(!redToggle)}>
            Редактировать
          </button>
          <button onClick={() => setValueToggle(!valueToggle)}>Значения</button>
        </div>
        {redToggle && (
          <div>
            <label>
              Новое значение:
              <input
                id="newName"
                name="newName"
                className="input_form"
                type="text"
                value={newChar}
                onChange={(event) => setNewChar(event.target.value)}
              />
            </label>

            <button disabled={disabled} onClick={updateChar}>
              Применить
            </button>
            {/* <button disabled={disabled} onClick={NEWupdateChar}>
              Применить NEW!
            </button> */}
          </div>
        )}
        {valueToggle && (
          // <div>
          //   <div onClick={() => console.log(allCharsValuesContext)}>value1</div>
          //   <div>value2</div>
          //   <div>value3</div>
          // </div>
          <ValueOfCharPlate charID={props?.c?.id} />
        )}
      </div>
    </div>
  );
}
