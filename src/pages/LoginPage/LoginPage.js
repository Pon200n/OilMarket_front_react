import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
export function LoginPage() {
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
  // * установка ширины блока с контентом
  // let footHeight = document.querySelector("footer").offsetHeight;
  // let headHeight = document.querySelector(".main_header").offsetHeight;
  // let docHeigth = document.documentElement.clientHeight;
  // let minHeight = docHeigth - (footHeight + headHeight);

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

  return (
    <div className="content_wrapper_login">
      {/* <div className="content_wrapper" style={{ minHeight: minHeight }}> */}
      {/* <h6>ник:{nikName}</h6>
      <h6>Пароль:{password}</h6> */}

      <div className="form_page_form_conteiner">
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
    </div>
  );
}
