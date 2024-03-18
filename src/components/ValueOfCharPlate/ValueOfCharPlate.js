import { useState } from "react";
import { useContext } from "react";
import { AllCharsValuesContext } from "../../context";
import { Value } from "../../components/Value/Value.js";
import "./ValueOfCharPlate.css";
export function ValueOfCharPlate(props) {
  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  const [ValueName, setValueName] = useState("");
  let filtValOfChar = allCharsValuesContext.filter(
    (item) => item.char_id == props?.charID
  );
  console.log(filtValOfChar);
  function addValue() {
    fetch(
      "http://oilmarket1/addValue/index.php/?charID=" +
        props?.charID +
        "&valueName=" +
        ValueName
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAllCharsValuesContext(response);
      });
  }
  let setButtonDis;
  if (ValueName === "") {
    setButtonDis = "disabled";
  }
  return (
    <div className="valueOfCharPlate">
      <div className="valueOfCharPlateInner">
        <label className="labelValueOfCharPlate">
          Добавить:
          <input
            id="ValueName"
            name="ValueName"
            type="text"
            value={ValueName}
            onChange={(event) => setValueName(event.target.value)}
          />
        </label>
        <button
          className="valueOfCharPlateAddButton"
          disabled={setButtonDis}
          onClick={addValue}
        >
          Добавить
        </button>
      </div>
      {filtValOfChar &&
        filtValOfChar.map((it) => <Value key={it.id} it={it} />)}
    </div>
  );
}
