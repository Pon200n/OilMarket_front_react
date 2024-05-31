import { useEffect, useState } from "react";
import { useContext } from "react";
import { observer } from "mobx-react";
import { mobxContext } from "../..";

export const ValueSelectBarLara = observer((props) => {
  //   const [Switch, setSwitch] = useState(false);
  const { product } = useContext(mobxContext);
  let char_id = +props?.char?.id;
  let notFiltrValues = product.values;

  let filtratedValues;
  if (notFiltrValues) {
    filtratedValues = notFiltrValues.filter(function (v) {
      return v.char_id === char_id;
    });
  }

  let farr;
  if (product.productValues) {
    farr = product.productValues.filter(function (x) {
      return +x.char_id === char_id;
    });
  }

  //   function to(e) {
  //     if (farr.length === 0) {
  //       product.setProductValues([
  //         ...product.productValues,
  //         { value: `${+e.target.value}`, char_id: `${+char_id}` },
  //       ]);
  //     } else {
  //       let rr = product.productValues.filter(function (x) {
  //         return +x.char_id != char_id;
  //       });

  //       product.setProductValues([
  //         ...rr,
  //         { value: `${+e.target.value}`, char_id: `${+char_id}` },
  //       ]);
  //     }
  //   }

  let f;
  function checkChange(ev) {
    f = product.productValues.find((item) => item.value == ev.target.value);

    if (!f) {
      product.setProductValues([
        ...product.productValues,
        { value: `${+ev.target.value}`, char_id: `${+char_id}` },
      ]);
    } else {
      let del = product.productValues.filter((item) => item != f);

      product.setProductValues(del);
    }
  }

  return (
    <>
      {/* <button onClick={() => setSwitch(!Switch)}>switch</button>
      {filtratedValues && (
        <select
          name=""
          id=""
          onChange={(event) => to(event)}
          //   onChange={(event) => console.log(event.target.value)}
        >
          <option>выбирете характеристику</option>
          {filtratedValues &&
            filtratedValues.map((value) => (
              <option value={value?.id} key={value?.id}>
                {value?.value_name}
              </option>
            ))}
        </select>
      )} */}
      {filtratedValues &&
        filtratedValues.map((value) => (
          <div key={value.id}>
            <input
              type="checkbox"
              value={value.id}
              key={value.id}
              checked={product.productValues.find(
                (item) => item.value == value.id
              )}
              onChange={(event) => checkChange(event)}
            />
            {value.value_name}
          </div>
        ))}
    </>
  );
});

export default ValueSelectBarLara;
