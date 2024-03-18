import { AllCharsValuesContext } from "../../context";
import { FiltrationValuesCategPageContext } from "../../context";
import { Page_CategoryPageContext } from "../../context";
import { useContext, useState } from "react";
import "./FilterBarCategoryPage.css";
export function FilterBarCategoryPage(props) {
  const [page_CategoryPageContext, setPage_CategoryPageContext] = useContext(
    Page_CategoryPageContext
  );
  const [allCharsValuesContext, setAllCharsValuesContext] = useContext(
    AllCharsValuesContext
  );
  const [
    filtrationValuesCategPageContext,
    setFiltrationValuesCategPageContext,
  ] = useContext(FiltrationValuesCategPageContext);

  let filtredChars = allCharsValuesContext.filter((it) => {
    return +it.char_id === +props.item.id;
  });

  function ChangeIDValuesArr(ev) {
    setPage_CategoryPageContext(1);
    let checkValue = filtrationValuesCategPageContext.some((value) => {
      return +value == +ev;
    });

    if (!checkValue) {
      setFiltrationValuesCategPageContext([
        ...filtrationValuesCategPageContext,
        +ev,
      ]);
    } else {
      let IDValWithoutCheckVal = filtrationValuesCategPageContext.filter(
        (val) => {
          return +val != +ev;
        }
      );
      setFiltrationValuesCategPageContext(IDValWithoutCheckVal);
    }
    // filtrByValuesCatPage();
  }
  // console.log(
  //   "filtrationValuesCategPageContext",
  //   filtrationValuesCategPageContext
  // );
  // function filtrByValuesCatPage() {
  //   fetch(
  //     "http://oilmarket1/filtrByValuesCatPage/index.php" +
  //       "?ArrValues=" +
  //       filtrationValuesCategPageContext
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(response));
  // }

  return (
    <>
      {/* <button onClick={filtrByValuesCatPage}>filtrByValuesCatPage</button> */}
      {filtredChars.map((value) => (
        <div key={value.id} className="checkbox_FilterBarCategoryPage">
          <input
            type="checkbox"
            value={value.id}
            key={value.id}
            className="checkbox_FilterBarCategoryPage"
            checked={filtrationValuesCategPageContext.some((v) => {
              return v == value.id;
            })}
            onChange={(event) => ChangeIDValuesArr(event.target.value)}
          />
          {value.value_name}
        </div>
      ))}
    </>
  );
}
