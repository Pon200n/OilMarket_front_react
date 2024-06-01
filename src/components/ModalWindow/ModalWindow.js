import { observer } from "mobx-react";
import "./ModalWindow.css";
import { mobxContext } from "../..";
import { useState, useContext } from "react";

const ModalWindow = observer(() => {
  const { service } = useContext(mobxContext);
  const [hideModal, setHideModal] = useState(true);
  return (
    <>
      {service.error_message && (
        <div>
          <div className="modalWindowWrapper">
            <div className="modalWindowMessage">
              <h3>{service.error_message}</h3>
            </div>
            <div
              className="modalWindowCloseButton"
              onClick={() => service.setErrorMessage("")}
            >
              X
            </div>
          </div>
        </div>
      )}
    </>
  );
});
export default ModalWindow;
