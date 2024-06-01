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
        <div className="modalWindowWrapper">
          <h3>{service.error_message}</h3>
          <button onClick={() => service.setErrorMessage("")}>X</button>
        </div>
      )}
    </>
  );
});
export default ModalWindow;
