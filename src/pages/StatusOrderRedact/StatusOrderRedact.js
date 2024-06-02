import { useState, useEffect, useContext } from "react";
import { StatusContext } from "../../context";
import StatusPlate from "../../components/StatusPlate/StatusPlate";
import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { addStatus } from "../../http/orderAPI";

const StatusOrderRedact = observer(() => {
  const { service } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  const [statusName, setStatusName] = useState();

  const [req, setReq] = useState();
  const [badReq, setBadReq] = useState();

  useEffect(() => {
    setBadReq(false);
    setReq(false);
  }, [statusName]);

  let disabled;
  let disColor;

  if (!statusName) {
    disabled = true;
    disColor = "grey";
  }

  // * lara 02.06.2024
  async function addStatusLara() {
    try {
      let conf = window.confirm("Добавить статус " + statusName + " ?");
      if (conf) {
        await addStatus(statusName).then((response) => {
          order.setStatuses(response.data.data);
        });
      }
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }

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
            onClick={addStatusLara}
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

      {/* {statusContext &&
        statusContext.map((item) => <StatusPlate key={item.id} item={item} />)} */}
      {order.order_statuses &&
        order.order_statuses.map((item) => (
          <StatusPlate key={item.id} item={item} />
        ))}
    </>
  );
});

export default StatusOrderRedact;
