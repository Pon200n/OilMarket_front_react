import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BurgerContext } from "../context";
import { CategoryContext } from "../context";
import HeaderMobilePanel from "./HeaderMobilePanel/HeaderMobilePanel.js";
import BurgerMenuPanel from "./BurgerMenuPanel/BurgerMenuPanel.js";
import HeaderSubBrandMenu from "./HeaderSubBrandMenu/HeaderSubBrandMenu";
import { mobxContext } from "../index";
import { observer } from "mobx-react";

export const Header = observer(() => {
  const { user } = useContext(mobxContext);
  const { product } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  const [burgerContext, setBurgerContext] = useContext(BurgerContext);
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);

  useEffect(() => {
    setBurgerContext(false);
  }, []);

  let totalBasketCount = order.user_basket_products.reduce(
    (sum, item) => sum + item.product_count,
    0
  );

  const [hidePhoneNumber, setHidePhoneNumber] = useState(false);

  return (
    <div className="main_header">
      <div className="reg_wrapper">
        <div className="reg">
          {user.isAuth ? (
            <div className="regInterLeft">
              <Link to="/personalAccount" className="btn_top">
                Личный кабинет
              </Link>
            </div>
          ) : (
            <></>
          )}
          <div className="regInter">
            <div className="regInterBlock">
              <div className="li_it">
                <Link to="/login" className="btn_top">
                  Войти
                </Link>
                <Link to="/registration" className="btn_top">
                  Регистрация
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user.role === "admin" && (
        <>
          <div className="item1">
            <div className="city">
              <Link to="/admin_panel" className="btn_top">
                Админпанель
              </Link>
            </div>
            <ul className="ul_it1">
              <li className="li_it">
                <Link to="/createProduct" className="btn_top">
                  Добавить товар
                </Link>
              </li>
              <li className="li_it">
                <Link to="/add_category" className="btn_top">
                  Добавить категорию
                </Link>
              </li>
              <li className="li_it">
                <Link to="/add_brand" className="btn_top">
                  Добавить бренд
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      <div className="item2">
        <div className="item2_social_block">
          <div className="phone_block">
            <img
              onClick={() => setHidePhoneNumber(!hidePhoneNumber)}
              src="/icon/png-clipart-iphone-telephone-logo-smartphone-iphone-electronics-text.png"
              className="phone_ic"
              width="40px"
              height="40px"
              alt=""
            />
          </div>

          <div className="social">
            <a
              href="https://api.whatsapp.com"
              target="_blank"
              className="btn_1"
            >
              W{" "}
            </a>
            <a
              href="https://web.telegram.org"
              target="_blank"
              className="btn_1"
            >
              T{" "}
            </a>
            <a
              href="https://vk.com/public216545506"
              target="_blank"
              className="btn_1"
            >
              VK
            </a>
          </div>
        </div>

        <Link to="/">
          <div className="main_logo">
            <div className="logo_left">CQ</div>
            <div className="logo_right">CAT OIL</div>
          </div>
        </Link>

        <div className="block_btn_2">
          <div className="fav">
            <Link to="/favorites" className="btn_2">
              <img
                src="/icon/free-icon-star-126482.png"
                width="20px"
                height="20px"
                alt=""
              />

              <span className="icon_iside">Избранное</span>
            </Link>
            {user.favoriteProducts.length > 0 && (
              <span className="headerBasketCount">
                {user.favoriteProducts.length}
              </span>
            )}
          </div>
          <div className="comp">
            <Link to="/compare" className="btn_2">
              <img
                src="/icon/business-and-finance.png"
                width="20px"
                height="20px"
                alt=""
              />
              <span className="icon_iside">Сравнение</span>
            </Link>
          </div>
          <div className="basket">
            <Link to="/account_basket" className="btn_2">
              <img
                src="/icon/free-icon-shopping-cart-481384.png"
                width="20px"
                height="20px"
                alt=""
              />
              <span className="icon_iside">Корзина</span>
            </Link>

            {order.user_basket_products.length > 0 && (
              <span className="headerBasketCount">{totalBasketCount}</span>
            )}
          </div>
        </div>
      </div>
      {hidePhoneNumber && (
        <div>
          {/* <div className="it_block_1"> */}
          {/* <div className="tel_1">8 800-600-01-01</div> */}
          {/* <div className="tel_str1">ИНТЕРНЕТ-МАГАЗИН</div> */}
          <div className="phone_menu">
            <span className="phone_menu_number">+7 (3843) 34-80-30</span>
          </div>
          {/* <div className="tel_2">+7 (3843) 34-80-30</div> */}
          {/* <a href="#" className="tel_str2">
              ЗАКАЗАТЬ ЗВОНОК
            </a> */}
          {/* </div> */}
        </div>
      )}

      <div className="item3">
        <div className="catalog">
          <img
            src="/icon/hamburger-menu-grey.png"
            alt=""
            className="cat_ic_1"
          />

          <span className="sp_cat">Каталог товаров</span>
          <img src="/icon/arrow-down-black.png" alt="" className="cat_ic_2" />
          <ul className="sub_menu">
            {/* {categoryContext &&
              categoryContext.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/category_page/${item?.id}/none`}
                    className="sub_m_it"
                    key={item.id}
                  >
                    {item?.category_name}
                  </Link>

                  <div className="c-menu_motor_oil">
                    <div className="maker">Производители </div>
                    <div className="oil_makers">
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <HeaderSubBrandMenu
                          key={item.id}
                          categoryID={item?.id}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))} */}
            {product.categories &&
              product.categories.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/category_page/${item?.id}/''`}
                    // to={`/category_page/${item?.id}/none`}
                    className="sub_m_it"
                    key={item.id}
                  >
                    {item?.category_name}
                  </Link>

                  <div className="c-menu_motor_oil">
                    <div className="maker">Производители </div>
                    <div className="oil_makers">
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <HeaderSubBrandMenu
                          key={item.id}
                          categoryID={item?.id}
                          exist_brands={item?.exist_brands}
                          // category_id={item?.category_id}
                          // brand_id={item?.brand_id}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="form">
          <div>
            <input
              type="text"
              placeholder="Поиск по каталогу"
              className="input"
            />
            <button
              type="submit"
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <img
                className="img_gog"
                src="/icon/142-1425732_google-web-search-icon-search-icon-png-white.png"
                alt=""
              />
            </button>
          </div>
        </div>

        <ul className="nav_2">
          <li>
            <a href="" className="btn_bot">
              Адреса магазинов
            </a>
          </li>
          <li>
            <a href="" className="btn_bot">
              Акции
            </a>
          </li>
          <li>
            <a href="" className="btn_bot">
              Доставка
            </a>
          </li>
          <li>
            <Link to="/bonus" className="btn_bot">
              Бонусная система
            </Link>
          </li>
        </ul>
      </div>
      <HeaderMobilePanel />
      <BurgerMenuPanel />
    </div>
  );
});
