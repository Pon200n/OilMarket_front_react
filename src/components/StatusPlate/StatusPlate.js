import "./StatusPlate.css";
import { StatusContext } from "../../context";
import { useContext, useState } from "react";
import { deleteStatus, updateStatus } from "../../http/orderAPI";
import { observer } from "mobx-react";
import { mobxContext } from "../..";

const StatusPlate = observer((props) => {
  const { service } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  const [statusContext, setStatusContext] = useContext(StatusContext);
  const [redToggle, setRedToggle] = useState(false);
  const [newName, setNewName] = useState();

  let disabled;
  if (!newName) {
    disabled = "disabled";
  }

  // async function deleteStatus() {
  //   let conf = window.confirm(
  //     "Хотите удалить категорию " + props?.item?.order_status_description + " ?"
  //   );
  //   if (conf) {
  //     fetch(
  //       "http://oilmarket1/delOrderStatus/index.php/?statusID=" + props.item.id
  //     )
  //       .then((response) => response.json())

  //       .then((response) => {
  //         setStatusContext(response);
  //       });
  //   }
  // }

  // async function updateStatus() {
  //   fetch("http://oilmarket1/updateStatus/index.php", {
  //     method: "POST",
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: newName,
  //       id: props.item.id,
  //     }),
  //   })
  //     .then((response) => response.json())

  //     .then((response) => {
  //       setStatusContext(response);
  //     });
  // }
  // ** lara 02.06.2024
  async function deleteStatusLara() {
    try {
      let conf = window.confirm(
        "Хотите удалить статус " + props?.item?.status_name + " ?"
      );
      if (conf) {
        await deleteStatus(props?.item?.id).then((response) => {
          console.log(response);
          order.setStatuses(response.data.data);
        });
      }
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }

  async function updateStatusLara() {
    try {
      let conf = window.confirm("Именить на " + newName + " ?");
      if (conf) {
        await updateStatus(props?.item?.id, newName).then((response) =>
          order.setStatuses(response.data.data)
        );
      }
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }
  return (
    <div className="cat_br_pl_wrapper">
      {props?.item?.status_name ? (
        <div className="cat_br_pl_item2">
          <div className="cat_br_pl_item">
            <div style={{ marginRight: "3vw" }}>ID: {props?.item?.id}</div>
            <div style={{ marginRight: "3vw" }}>{props?.item?.status_name}</div>
            <div>
              <button onClick={deleteStatusLara} style={{ marginRight: "3vw" }}>
                Удалить X
              </button>

              <button onClick={() => setRedToggle(!redToggle)}>
                Редактировать
              </button>
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
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                </label>

                <button disabled={disabled} onClick={updateStatusLara}>
                  Применить
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default StatusPlate;
