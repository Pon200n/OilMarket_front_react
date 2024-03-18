import { useState, useContext } from "react";
import { AllCharsValuesContext } from "../../context";
import "./Value.css";

export function Value(props) {
  const [newValueName, setNewValueName] = useState("");
  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );

  function delValue() {
    let conf = window.confirm(`Удалить : '${props?.it?.value_name}'?`);
    if (conf) {
      fetch("http://oilmarket1/delValue/index.php/?valueID=" + props?.it?.id)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setAllCharsValuesContext(response);
        });
    }
  }
  function updateValue() {
    let conf = window.confirm(
      `Переименовать '${props?.it?.value_name}' в '${newValueName}' ?`
    );
    if (conf) {
      fetch(
        "http://oilmarket1/updateValue/index.php/?valueID=" +
          props?.it?.id +
          "&newValueName=" +
          newValueName +
          "&char_id=" +
          props?.it?.char_id
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setAllCharsValuesContext(response);
          setNewValueName("");
        });
    }
  }
  let setButtonDis;
  if (newValueName === "") {
    setButtonDis = "disabled";
  }
  return (
    <>
      <div className="valueBar">
        <span className="valueName">{props?.it?.value_name}</span>
        <label>
          Измениить значение:
          <input
            id="newValueName"
            name="newValueName"
            type="text"
            value={newValueName}
            onChange={(event) => setNewValueName(event.target.value)}
          />
        </label>
        <button
          className="setButtonValue"
          disabled={setButtonDis}
          onClick={updateValue}
        >
          Установить
        </button>
        <button className="delButtonValue" onClick={delValue}>
          Удалить
        </button>
      </div>
    </>
  );
}
