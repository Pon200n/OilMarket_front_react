import { useState, useEffect, useContext } from "react";
import { StatusContext } from "../../context";
import { StatusPlate } from "../../components/StatusPlate/StatusPlate";

export function StatusOrderRedact() {
  const [statusName, setStatusName] = useState();
  const [statusContext, setStatusContext] = useContext(StatusContext);
  const [req, setReq] = useState();
  const [badReq, setBadReq] = useState();
  // const [stat, setStat] = useState([]);

  useEffect(() => {
    getStatuses();
    setBadReq(false);
    setReq(false);
  }, [statusName]);

  let disabled;
  let disColor;

  if (!statusName) {
    disabled = true;
    disColor = "grey";
  }
  async function addOrderStatus() {
    let response = await fetch(
      "http://oilmarket1/addOrderStatus/index.php/?status=" + statusName
    );
    let res = await response.json();
    let status = await res.status;
    let msg = await res.msg;
    let arr = await res?.array;
    if (status === "ok") {
      setReq(msg);
      setBadReq(false);
      // setStat(arr);
      setStatusContext(arr);
    } else {
      setBadReq(msg);
      setReq(false);
    }
  }
  function getStatuses() {
    fetch("http://oilmarket1/getStatuses/index.php")
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        // setStat(response);
        setStatusContext(response);
      });
  }
  console.log(statusContext);
  return (
    <>
      <div className="head">
        <h3>Статус заказа</h3>
      </div>
      <div className="form_page_form_conteiner">
        <div>
          <label>
            Статус:
            <input
              id="statusName"
              name="statusName"
              className="input_form"
              type="text"
              value={statusName}
              onChange={(event) => setStatusName(event.target.value)}
            />
          </label>
          <br />
          {badReq && <div className="regErrorBr">{badReq}</div>}
          {req && <div className="regSuccessBr">{req}</div>}

          <button
            type="submit"
            className="form_input_button"
            // onClick={() => console.log(statusName)}
            onClick={addOrderStatus}
            disabled={disabled}
            style={{ background: disColor }}
            // style={styleContainer}
          >
            Добавить
          </button>
          {/* <button
            className="form_input_button"
            onClick={getStatuses}
          >
            Получить
          </button> */}
        </div>
      </div>

      {statusContext &&
        statusContext.map((item) => <StatusPlate key={item.id} item={item} />)}
    </>
  );
}
