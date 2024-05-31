import { useState } from "react";
import { useContext } from "react";
import { AllCharsValuesContext } from "../../context";
import { Value } from "../../components/Value/Value.js";
import { mobxContext } from "../..";
import "./ValueOfCharPlate.css";
import { addValueLara } from "../../http/productAPI";
import { observer } from "mobx-react";

export const ValueOfCharPlate = observer((props) => {
  const { product } = useContext(mobxContext);

  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  const [ValueName, setValueName] = useState("");
  let filtValOfChar = allCharsValuesContext.filter(
    (item) => item.char_id == props?.charID
  );
  // function addValue() {
  //   fetch(
  //     "http://oilmarket1/addValue/index.php/?charID=" +
  //       props?.charID +
  //       "&valueName=" +
  //       ValueName
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setAllCharsValuesContext(response);
  //     });
  // }
  let setButtonDis;
  if (ValueName === "") {
    setButtonDis = "disabled";
  }
  // ***lara*******
  let filtValOfChar2 = product.values.filter(
    (item) => item.char_id == props?.charID
  );

  async function addValue() {
    try {
      await addValueLara(ValueName, props?.charID).then((response) => {
        product.setValues(response.data.data);
      });
    } catch (e) {
      alert(e.message);
    }
  }
  // **lara end***
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
      {/* {filtValOfChar &&
        filtValOfChar.map((it) => <Value key={it.id} it={it} />)} */}
      {filtValOfChar2 &&
        filtValOfChar2.map((it) => <Value key={it.id} it={it} />)}
    </div>
  );
});
