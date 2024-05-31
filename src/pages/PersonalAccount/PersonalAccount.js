import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext";
import { BasketContext } from "../../basketContext";
import { BurgerContext } from "../../context";
import { mobxContext } from "../../index";
import { observer } from "mobx-react";
// import { BurgerMenuPanel } from "../../components/BurgerMenuPanel/BurgerMenuPanel";

import "./PersonalAccount.css";
import { logOut } from "../../http/userAPI";

export const PersonalAccount = observer(() => {
  const { user } = useContext(mobxContext);

  useEffect(() => {
    setBurgerContext(false);
  }, []);

  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [basketContext, setBasketContext] = useContext(BasketContext);
  const [burgerContext, setBurgerContext] = useContext(BurgerContext);

  function clearLocalStorage() {
    localStorage.clear();
    setUserContext({});
    if (useContext.id != 0) setBasketContext([{ product_count: 0 }]);
    alert("Вы вышли из аккаунта.");
    navigate("/");
  }

  // const logOutLara = async () => {
  //   try {
  //     const response = await logOut();
  //     console.log(response);
  //     user.setUserDefault();
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };

  async function logOutLara() {
    // await logOut()
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    localStorage.clear();
    user.setUserDefault();
    // });
  }

  return (
    // <div className="content_wrapper" style={{ minHeight: minHeight }}>
    <>
      {/* <BurgerMenuPanel /> */}

      <div className="content_wrapper">
        <div className="head">
          <h1>Личный кабинет</h1>
        </div>
        <div className="buttonWrapper">
          <div className="btnI">
            <Link to="/account_basket" className="btn_PA">
              Корзина товаров
            </Link>
          </div>
          <div className="btnI">
            <Link to="/order_user" className="btn_PA">
              Заказы
            </Link>
          </div>

          {/* <div className="btnI">
            <Link to="/" className="btn_PA" onClick={clearLocalStorage}>
              Выйти
            </Link>
          </div> */}
          <div className="btnI">
            <Link to="/" className="btn_PA" onClick={logOutLara}>
              Выйти
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});
