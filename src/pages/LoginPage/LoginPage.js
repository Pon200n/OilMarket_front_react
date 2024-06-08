import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../http/userAPI";
import "./LoginPage.css";
import { observer } from "mobx-react";
import { mobxContext } from "../../index";

const LoginPage = observer(() => {
  const { user } = useContext(mobxContext);
  const { order } = useContext(mobxContext);

  const [nikName, setNikname] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setErr(false);
  }, [nikName, password]);

  function authGetToken() {
    fetch("http://oilmarket1/loginUser/loginUser.php", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nikName,
        password,
      }),
    })
      .then((response) => response.text())
      .then((response) => {
        const result = JSON.parse(response);
        const status = result.status;

        if (status === "ok") {
          const token = result.result;
          localStorage.setItem("token", token);
          alert("Вы успешно авторизовались.");
          navigate("/");
        } else if (status === "invPass") {
          const msg = result.msg;
          setErr(msg);
        } else if (status === "invUsser") {
          const msg = result.msg;
          setErr(msg);
        }
      });
  }

  // * валидация
  let disabled;
  let styleContainer;
  if (nikName && password) {
    disabled = false;
    styleContainer = {
      background: "#4CAF50",
      "--hover-opacity": 0.9,
    };
  } else {
    disabled = true;
    styleContainer = {
      background: "#ccc",
    };
  }
  //валидация поле nikName
  let color;
  let display;
  if (nikName) {
    display = "none";
  } else {
    display = "block";
    color = "red";
  }
  //валидация поле password
  let colorPass;
  let displayPass;
  if (password) {
    displayPass = "none";
  } else {
    displayPass = "block";
    colorPass = "red";
  }

  // * LARAVEL AUTH
  const [LaraUserName, setLaraUserName] = useState("");
  const [LaraUserEmail, setLaraUserEmail] = useState("");
  const [LaraUserPassword, setLaraUserPassword] = useState("");

  function LaraLogin() {
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: LaraUserName,
        email: LaraUserEmail,
        password: LaraUserPassword,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.token);
      });
  }

  const loginAxiosLara = async () => {
    try {
      const response = await login(
        LaraUserName,
        LaraUserEmail,
        LaraUserPassword
      );
      // console.log(response);
      // console.log("role", response.data.role);
      // console.log("token", response.data.token);
      // console.log("user", response.data.user);
      // console.log("role", response.data.role);
      // console.log("basket_products", response.data.user.basket.basket_products);
      user.setThisUser(response.data.user);
      user.setThisAuth(true);
      user.setThisRole(response.data.role);
      order.setUserBasketProducts(response.data.user.basket.basket_products);

      user.setOrders(response.data.user.orders);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {/* <div className="content_wrapper_login"> */}
      {/* <div className="content_wrapper" style={{ minHeight: minHeight }}> */}
      {/* <h6>ник:{nikName}</h6>
      <h6>Пароль:{password}</h6> */}

      {/* <div className="form_page_form_conteiner">
          <div>
            <label>
              Login:
              <input
                id="nikName"
                name="nikName"
                className="input_form"
                type="text"
                value={nikName}
                onChange={(event) => setNikname(event.target.value)}
              />
            </label>
            <div style={{ display: display, color: color }}>
              Необходимо заполнить поле
            </div>
            <br />

            <br />
            <label>
              Пароль:
              <input
                id="password"
                name="password"
                className="input_form"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <div style={{ display: displayPass, color: colorPass }}>
              Необходимо заполнить поле
            </div>
            <br />
            {err && <div className="loginError">{err}</div>}
            <button
              type="submit"
              className="form_input_button"
              onClick={authGetToken}
              disabled={disabled}
              // style={{ background: disColor }}
              style={styleContainer}
            >
              Отправить
            </button>
          </div>
        </div>
      </div> */}

      {/*LARAVEL AUTH  */}
      <h1 style={{ display: "flex", justifyContent: "center" }}>Авторизация</h1>
      <div className="content_wrapper_login">
        <div className="form_page_form_conteiner">
          <div>
            <label>
              Имя:
              <input
                id="LaraUserName"
                name="LaraUserName"
                className="input_form"
                type="text"
                value={LaraUserName}
                onChange={(event) => setLaraUserName(event.target.value)}
              />
            </label>
            {/* <div style={{ display: display, color: color }}>
              Необходимо заполнить поле
            </div> */}
            <br />
            <label>
              Почта:
              <input
                id="LaraUserEmail"
                name="LaraUserEmail"
                className="input_form"
                type="email"
                value={LaraUserEmail}
                onChange={(event) => setLaraUserEmail(event.target.value)}
              />
            </label>
            {/* <div style={{ display: display, color: color }}>
              Необходимо заполнить поле
            </div> */}
            <br />

            <br />
            <label>
              Пароль:
              <input
                id="LaraUserPassword"
                name="LaraUserPassword"
                className="input_form"
                type="password"
                value={LaraUserPassword}
                onChange={(event) => setLaraUserPassword(event.target.value)}
              />
            </label>
            {/* <div style={{ display: displayPass, color: colorPass }}>
              Необходимо заполнить поле
            </div>
            <br />
            {err && <div className="loginError">{err}</div>} */}
            {/* <button
              type="submit"
              className="form_input_button"
              onClick={LaraLogin}
              // disabled={disabled}
              // style={{ background: disColor }}
              // style={styleContainer}
            >
              Отправить
            </button> */}
            <button
              type="submit"
              className="form_input_button"
              onClick={loginAxiosLara}
              // disabled={disabled}
              // style={{ background: disColor }}
              // style={styleContainer}
            >
              Отправить
            </button>
            {/* <button
              type="submit"
              className="form_input_button"
              onClick={testInt}
            >
              Получить через axios interceptors
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
});

export default LoginPage;
