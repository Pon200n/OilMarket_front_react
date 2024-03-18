import { useState } from "react";
import { useContext } from "react";
import { CharsValuesContext } from "../../context";
export function ValueSelectBar(props) {
  const [charsValuesContext, setCharsValuesContext] =
    useContext(CharsValuesContext);
  const [checkedState, setCheckedState] = useState([]);
  const [Switch, setSwitch] = useState(false);
  let char_id = +props?.n?.id;
  let notSortValues = props?.v;
  let sortValues;
  if (notSortValues) {
    sortValues = notSortValues.filter(function (v) {
      return v.char_id === char_id;
    });
  }

  let farr;
  if (charsValuesContext) {
    farr = charsValuesContext.filter(function (x) {
      return +x.char_id === char_id;
    });
  }

  // console.log("farr", farr);
  // console.log("notSortValues", notSortValues);
  // console.log("charsValuesContext", charsValuesContext);
  function to(e) {
    // console.log(e);
    // console.log("farr.lenght", farr.length);
    if (farr.length === 0) {
      setCharsValuesContext([
        ...charsValuesContext,
        { value: `${+e.target.value}`, char_id: `${+char_id}` },
      ]);
    } else {
      let rr = charsValuesContext.filter(function (x) {
        return +x.char_id != char_id;
      });
      // console.log(charsValuesContext);
      // console.log("rr", rr);
      setCharsValuesContext([
        ...rr,
        { value: `${+e.target.value}`, char_id: `${+char_id}` },
      ]);
    }
  }
  // let f;
  // function checkChange(ev) {
  //   f = checkedState.find((item) => item.value == ev.target.value);
  //   console.log("f", f);
  //   if (!f) {
  //     setCheckedState([
  //       ...checkedState,
  //       { value: `${+ev.target.value}`, char_id: `${+char_id}` },
  //     ]);
  //   } else {
  //     let del = checkedState.filter((item) => item != f);
  //     console.log("del", del);
  //     setCheckedState(del);
  //   }

  //   console.log("v.targed.value", ev.target.value);
  // }
  // console.log("checkedState", checkedState);
  let f;
  function checkChange(ev) {
    f = charsValuesContext.find((item) => item.value == ev.target.value);
    console.log("f", f);
    if (!f) {
      setCharsValuesContext([
        ...charsValuesContext,
        { value: `${+ev.target.value}`, char_id: `${+char_id}` },
      ]);
    } else {
      let del = charsValuesContext.filter((item) => item != f);
      console.log("del", del);
      setCharsValuesContext(del);
    }

    console.log("v.targed.value", ev.target.value);
  }
  console.log("сharsValuesContext", charsValuesContext);

  return (
    <>
      <button onClick={() => setSwitch(!Switch)}>switch</button>
      {/* <button onClick={() => console.log("Switch")}>cons</button> */}
      {!Switch && (
        <select name="" id="" onChange={(event) => to(event)}>
          <option>выбирете характеристику</option>
          {sortValues &&
            sortValues.map((value) => (
              <option value={value.id} key={value.id}>
                {value.value_name}
              </option>
            ))}
        </select>
      )}

      {Switch &&
        sortValues.map((value) => (
          <div key={value.id}>
            <input
              type="checkbox"
              value={value.id}
              key={value.id}
              // checked={checked}
              onChange={(event) => checkChange(event)}
            />
            {value.value_name}
          </div>
        ))}
    </>
  );
}
