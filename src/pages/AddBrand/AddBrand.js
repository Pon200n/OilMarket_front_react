import { useState, useContext, useEffect } from "react";
import { BrandContext } from "../../context";
import { CategBrndPlate } from "../../components/CategBrndPlate/CategBrndPlate";

import "./AddBrand.css";
export function AddBrand() {
  const [brand, setBrand] = useState();
  const [req, setReq] = useState();
  const [badReq, setBadReq] = useState();
  const [brandContext, setBrandContext] = useContext(BrandContext);

  useEffect(() => {
    setBadReq(false);
    setReq(false);
  }, [brand]);

  let disabled;
  let disColor;
  if (!brand) {
    disabled = true;
    disColor = "grey";
  }
  async function addBrandToDB() {
    let response = await fetch(
      "http://oilmarket1/addBrand/index.php/?brand=" + brand
    );

    let res = await response.json();
    // console.log(res);
    let status = await res.status;
    let msg = await res.msg;
    let arr = await res?.array;

    console.log(status, msg);
    if (status === "ok") {
      setReq(msg);
      setBadReq(false);
      setBrandContext(arr);
    } else {
      setBadReq(msg);
      setReq(false);
    }
  }
  return (
    <>
      {/* <h3>{brand}</h3> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Добавить бренд</h2>
      </div>
      <div className="form_page_form_conteiner">
        <div>
          <label>
            Бренд:
            <input
              id="brand"
              name="brand"
              className="input_form"
              type="text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </label>
          {!brand && (
            <div style={{ color: "red" }}>Необходимо заполнить поле</div>
          )}
          <br />
          {badReq && <div className="regErrorBr">{badReq}</div>}
          {req && <div className="regSuccessBr">{req}</div>}

          <button
            type="submit"
            className="form_input_button"
            onClick={addBrandToDB}
            disabled={disabled}
            style={{ background: disColor }}
            // style={styleContainer}
          >
            Добавить
          </button>
        </div>
      </div>
      <h2 style={{ display: "flex", justifyContent: "center" }}>Бренды</h2>
      {brandContext ? (
        brandContext.map((item) => <CategBrndPlate key={item.id} item={item} />)
      ) : (
        <div>нет данных</div>
      )}
    </>
  );
}
