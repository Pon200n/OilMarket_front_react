import { Link } from "react-router-dom";
import "./HeaderMobilePanel.css";
import { BurgerContext } from "../../context";
import { BasketContext } from "../../basketContext";
import { useContext, useState } from "react";

export function HeaderMobilePanel() {
  const [burgerContext, setBurgerContext] = useContext(BurgerContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);
  const [phoneMenu, setPhoneMenu] = useState(false);

  function phoneToggle() {
    setPhoneMenu(!phoneMenu);
  }

  function togleContext() {
    setBurgerContext(!burgerContext);
    console.log("burgerContext", burgerContext);
  }
  let totalBasketCount = basketContext.reduce(
    (sum, item) => sum + item.product_count,
    0
  );
  let display;
  if (totalBasketCount > 0) {
    display = "inline";
  } else display = "none";

  return (
    <>
      <div className="item4">
        <div className="mobile_header_btn">
          <div className="mobile_btn" onClick={togleContext}>
            <img
              src="icon\icons8-WHITE_MENU-64.png"
              width="40px"
              height="40px"
              alt=""
            />
          </div>
        </div>
        <div className="mobile_header_btn">
          <div onClick={() => setPhoneMenu(!phoneMenu)} className="mobile_btn">
            <img
              src="icon\icons8-WHITE_phone.png"
              width="40px"
              height="40px"
              alt=""
            />
          </div>
        </div>
        <div className="mobile_header_btn">
          <Link to="/" className="mobile_btn">
            <img
              src="icon\icons8_WHITE_STAR.png"
              width="40px"
              height="40px"
              alt=""
            />
          </Link>
        </div>
        <div className="mobile_header_btn">
          <Link to="/" className="mobile_btn">
            <img
              src="icon\icons8-WHITE_COMPARE2.png"
              width="40px"
              height="40px"
              alt=""
            />
          </Link>
        </div>
        <div className="mobile_header_btn">
          <Link to="/account_basket" className="mobile_btn">
            <img
              src="icon\icons8-WHITEкорзина-48.png"
              width="40px"
              height="40px"
              alt=""
            />
          </Link>
          <span className="headerBasketCount" style={{ display: display }}>
            {totalBasketCount}
          </span>
        </div>
      </div>
      {phoneMenu && <div className="phone_menu">+7(950)-950-55-50</div>}
    </>
  );
}