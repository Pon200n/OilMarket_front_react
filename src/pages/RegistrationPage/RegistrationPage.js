import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";
export function RegistrationPage() {
  const [req, setReq] = useState();
  const [badReq, setBadReq] = useState();

  // const [id, setID] = useState(1);
  const [nikName, setNikname] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [eMail, seteMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function clickHandler() {
    fetch("http://oilmarket1/addUser/index.php", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nikName,
        lastName,
        firstName,
        patronymic,
        phone,
        eMail,
        password,
      }),
    })
      .then((response) => response.text())
      .then((response) => {
        const result = JSON.parse(response);
        const status = result.status;

        if (status === "ok") {
          const msg = result.msg;
          setReq(msg);
          setBadReq(false);
          // alert(msg);
          // navigate("/login");
        } else if (status === "error") {
          const msg = result.msg;
          setBadReq(msg);
          setReq(false);
        }

        // console.log(JSON.parse(response));
      });
  }

  return (
    <>
      {/* <h6>{req}</h6>
      <h6>ник:{nikName}</h6>
      <h6>Фамилия:{lastName}</h6>
      <h6>Имя:{firstName}</h6>
      <h6>Отчество:{patronymic}</h6>
      <h6>Номер телефона:{phone}</h6>
      <h6>Электронная почта:{eMail}</h6>
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
          {badReq && <div className="regError">{badReq}</div>}
          <br />

          <label>
            Фамилия:
            <input
              id="lastName"
              name="lastName"
              className="input_form"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <br />
          <label>
            Имя:
            <input
              id="firstName"
              name="firstName"
              className="input_form"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <br />
          <label>
            Отчество:
            <input
              id="patronymic"
              name="patronymic"
              className="input_form"
              type="text"
              value={patronymic}
              onChange={(event) => setPatronymic(event.target.value)}
            />
          </label>
          <br />
          <label>
            Номер телефона:
            <input
              id="phone"
              name="phone"
              className="input_form"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
          <br />
          <label>
            Электронная почта:
            <input
              id="eMail"
              name="eMail"
              className="input_form"
              type="email"
              value={eMail}
              onChange={(event) => seteMail(event.target.value)}
            />
          </label>
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
          <br />
          {req && <div className="regSuccess">{req}</div>}
          {!req && (
            <button
              type="submit"
              className="form_input_button"
              onClick={clickHandler}
            >
              Отправить
            </button>
          )}
          {req && (
            <button
              type="submit"
              className="form_input_button auth"
              onClick={() => navigate("/login")}
            >
              Авторизоваться
            </button>
          )}

          {/* <button type="submit" onClick={() => setReq(!req)}>
            Авторизоваться
          </button> */}
        </div>
      </div>
    </>
  );
}
