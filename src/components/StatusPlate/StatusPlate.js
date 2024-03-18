import "./StatusPlate.css";
import { StatusContext } from "../../context";
import { useContext, useState } from "react";

export function StatusPlate(props) {
  const [statusContext, setStatusContext] = useContext(StatusContext);
  const [redToggle, setRedToggle] = useState(false);
  const [newName, setNewName] = useState();

  let disabled;
  if (!newName) {
    disabled = "disabled";
  }

  async function deleteStatus() {
    let conf = window.confirm(
      "Хотите удалить категорию " + props?.item?.order_status_description + " ?"
    );
    if (conf) {
      fetch(
        "http://oilmarket1/delOrderStatus/index.php/?statusID=" + props.item.id
      )
        .then((response) => response.json())

        .then((response) => {
          setStatusContext(response);
        });
    }
  }

  async function updateStatus() {
    fetch("http://oilmarket1/updateStatus/index.php", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        id: props.item.id,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        setStatusContext(response);
      });
  }
  return (
    <div className="cat_br_pl_wrapper">
      {props?.item?.order_status_description ? (
        <div className="cat_br_pl_item2">
          <div className="cat_br_pl_item">
            <div style={{ marginRight: "3vw" }}>ID: {props?.item?.id}</div>
            <div style={{ marginRight: "3vw" }}>
              {props?.item?.order_status_description}
            </div>
            <div>
              <button onClick={deleteStatus} style={{ marginRight: "3vw" }}>
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

                <button disabled={disabled} onClick={updateStatus}>
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
}
