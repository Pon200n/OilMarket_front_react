import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";
import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { registration } from "../../http/userAPI";
import { useTranslation } from "react-i18next";
import { formatMessage } from "../../i18n.js";
import i18next from "i18next";
export const RegistrationPage = observer(() => {
  const { service } = useContext(mobxContext);

  // const [req, setReq] = useState();
  // const [badReq, setBadReq] = useState();

  // const [nikName, setNikname] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [patronymic, setPatronymic] = useState("");
  // const [phone, setPhone] = useState("");
  // const [eMail, seteMail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // function clickHandler() {
  //   fetch("http://oilmarket1/addUser/index.php", {
  //     method: "POST",
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       nikName,
  //       lastName,
  //       firstName,
  //       patronymic,
  //       phone,
  //       eMail,
  //       password,
  //     }),
  //   })
  //     .then((response) => response.text())
  //     .then((response) => {
  //       const result = JSON.parse(response);
  //       const status = result.status;

  //       if (status === "ok") {
  //         const msg = result.msg;
  //         setReq(msg);
  //         setBadReq(false);
  //         // alert(msg);
  //         // navigate("/login");
  //       } else if (status === "error") {
  //         const msg = result.msg;
  //         setBadReq(msg);
  //         setReq(false);
  //       }

  // console.log(JSON.parse(response));
  // });
  // }
  // ! registarion for LARAVEL API
  let nameRef = useRef();
  let second_name = useRef();
  let patronymic = useRef();
  let phone = useRef();
  let email = useRef();
  let password = useRef();
  let password_confirmation = useRef();

  const { t } = useTranslation();

  async function registrationLara() {
    try {
      await registration(
        nameRef.current.value,
        second_name.current.value,
        patronymic.current.value,
        phone.current.value,
        email.current.value,
        password.current.value,
        password_confirmation.current.value
      ).then((response) => {
        // console.log(response);
      });
    } catch (e) {
      //* console.log(e?.request?.response);
      //* console.log(e?.response?.data?.message);
      //* service.setErrorMessage(e.message);

      if (e.response && e.response.status === 422) {
        // const errorMessage = t(e.response.data.message);
        const errorMessage = translate(e.response.data.message);
        // console.log(e?.response?.data);
        // console.log(errorMessage);

        service.setErrorMessage(errorMessage);
      } else {
        service.setErrorMessage(e.message);
      }
    }
  }

  let value = "The name field is required. (and 3 more errors)";
  const parts = value.split(".");
  console.log(parts);
  const emailTakenPart = parts.find((part) => {
    return (
      part.includes("The email has already been taken") ||
      part.includes("The name field is required")
    );
  });
  console.log("emailTakenPart", emailTakenPart + ".");

  const translate = (value) => {
    const formattedMessage = formatMessage(value);

    return i18next.t(formattedMessage);
  };

  console.log("try", translate(value));
  return (
    <>
      <div className="form_page_form_conteiner">
        <button onClick={() => console.log("try", translate(value))}>
          try
        </button>
        {/* <div>
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
        {/* </div>  */}
      </div>
      <div className="reg_head">
        <h2>Регистрация</h2>
      </div>
      <div className="form_page_form_conteiner">
        <div>
          <label>
            Имя:
            <input
              id="name"
              name="name"
              className="input_form"
              type="text"
              ref={nameRef}
              // value={name}
              // onChange={(event) => setNikname(event.target.value)}
            />
          </label>
          {/* {badReq && <div className="regError">{badReq}</div>} */}
          <br />
          <label>
            Фамилия:
            <input
              id="second_name"
              name="second_name"
              className="input_form"
              type="text"
              ref={second_name}
              // value={name}
              // onChange={(event) => setNikname(event.target.value)}
            />
          </label>
          {/* {badReq && <div className="regError">{badReq}</div>} */}
          <br />
          <label>
            Отчество:
            <input
              id="patronymic"
              name="patronymic"
              className="input_form"
              type="text"
              ref={patronymic}
              // value={name}
              // onChange={(event) => setNikname(event.target.value)}
            />
          </label>
          {/* {badReq && <div className="regError">{badReq}</div>} */}
          <br />
          <label>
            Телефон:
            <input
              id="phone"
              name="phone"
              className="input_form"
              type="text"
              ref={phone}
              // value={name}
              // onChange={(event) => setNikname(event.target.value)}
            />
          </label>
          {/* {badReq && <div className="regError">{badReq}</div>} */}
          <br />
          <label>
            Электронная почта:
            <input
              id="email"
              name="email"
              className="input_form"
              type="email"
              ref={email}
              // value={name}
              // onChange={(event) => setNikname(event.target.value)}
            />
          </label>
          {/* {badReq && <div className="regError">{badReq}</div>} */}
          <br />
          <label>
            Пароль:
            <input
              id="password"
              name="password"
              className="input_form"
              type="password"
              ref={password}
              // value={name}
              // onChange={(event) => setNikname(event.target.value)}
            />
          </label>
          {/* {badReq && <div className="regError">{badReq}</div>} */}
          <br />
          <label>
            Подтвердите пароль:
            <input
              id="password"
              name="password"
              className="input_form"
              type="password"
              ref={password_confirmation}
              // value={name}
              // onChange={(event) => setNikname(event.target.value)}
            />
          </label>
          {/* {badReq && <div className="regError">{badReq}</div>} */}
          <br />

          <button onClick={registrationLara} className="form_input_button auth">
            Отправить
          </button>
        </div>
      </div>
    </>
  );
});
export default RegistrationPage;
