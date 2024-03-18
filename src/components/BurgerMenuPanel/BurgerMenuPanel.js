import { useContext, useEffect } from "react";
import { BurgerContext } from "../../context";
import { BrandContext } from "../../context";
import { CategoryContext } from "../../context";
import { UserContext } from "../../userContext";
import { Link } from "react-router-dom";
import { HeaderSubBrandMenu } from "../HeaderSubBrandMenu/HeaderSubBrandMenu";

import "./BurgerMenuPanel.css";
export function BurgerMenuPanel() {
  const [burgerContext, setBurgerContext] = useContext(BurgerContext);
  const [brandContext, setBrandContext] = useContext(BrandContext);
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [userContext, setUserContext] = useContext(UserContext);

  let transform = "translateX(0%)";
  if (burgerContext) {
    transform = "translateX(0%)";
  } else transform = "translateX(-100%)";

  let fn = () => {
    setBurgerContext(!burgerContext);
  };

  return (
    <>
      {burgerContext && <div onClick={fn} className="burger_overlay"></div>}
      <div id="burger_menu_panel_uniq_id">
        <div className="burger_menu_panel" style={{ transform: transform }}>
          <div className="burger_menu_item">
            <div className="li_it">
              <Link
                to="/login"
                className="btn_top"
                onClick={() => setBurgerContext(false)}
              >
                Войти
              </Link>
              <Link
                to="/registration"
                className="btn_top"
                onClick={() => setBurgerContext(false)}
              >
                Регистрация
              </Link>
            </div>
          </div>
          {userContext.id ? (
            <div className="burger_menu_item">
              <Link
                to="/personalAccount"
                className="btn_top"
                onClick={() => setBurgerContext(false)}
              >
                Личный кабинет
              </Link>
            </div>
          ) : (
            <></>
          )}
          {categoryContext &&
            categoryContext.map((item) => (
              <div className="burger_menu_item">
                <Link
                  className="btn_top"
                  to={`/category_page/${item?.id}/none`}
                  // className="burger_menu_item"
                  key={item.id}
                  onClick={() => setBurgerContext(false)}
                >
                  {item?.category_name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
