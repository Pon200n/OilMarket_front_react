import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";
import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { registration } from "../../http/userAPI";

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

  // function registration() {
  //   fetch("http://127.0.0.1:8000/api/register", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       // "X-CSRF-TOKEN":
  //       // "eyJpdiI6Ik05ZnBMVWgrSnpmZ2xNcGh3SHBqWFE9PSIsInZhbHVlIjoiY0tJNXBTV0ZEa3ZnOXpoeVVHanZqdk0rSldyQlVkTkZTdHBZdTNWd210SkQ4eG9zQk94ODJldy9MS2R1ZEd3T0tqK1l0THhPQ0VwNHRzYjlqVHAvRmFnMk5WZTB5cEFBVzBUbEpDd0c1Y1BhK0J5K3hUT2FYZlN1N0ZhYkxmVCsiLCJtYWMiOiIxMjIxOTM5YzNiNWJjM2M1ZWEzZWI1NDQwMWE2OGRjYzNmZjE2ZWFmYWNkNmRhZjllNDcxYjk2ZDU5MjY3YmFkIiwidGFnIjoiIn0=",
  //       // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vb2lsbWFya2V0MS9waHAtand0LyIsImF1ZCI6Imh0dHA6Ly9vaWxtYXJrZXQxL3BocC1qd3QvIiwiaWF0IjoxNzAzMzA4MDc1LCJleHAiOjE3MDMzMTE2NzUsImRhdGEiOnsiaWQiOiIxMyIsInJvbGUiOiJ1c2VyIiwibmlrIjoicGV0ZTIifX0.EgT3npphbOxLcyrF98SCFEaOJpsJrdos6Dr4ZKATuqE",
  //       // "eyJ0eXAiOiJKsdfgsdfsdfdsffffgzI1NiJ9.eyJpc3MiOiJodfsfsdfsfsfsdfIsImF1ZCI6Imh0dHA6Ly9vaWxtYXJrZXQxL3BocC1qd3QvIiwiaWF0IjoxNzAzMzA4MDc1LCJleHAiOjE3MDMzMTE2NzUsImRhdGEiOnsiaWQiOiIxMyIsInJvbGUiOiJ1c2VyIiwibmlrIjoicGV0ZTIifX0.sdfsgsdfgsdftbttsdfgsdfg434Jrdos6Dr4ZKATuqE",
  //     },
  //     body: JSON.stringify({
  //       name: nameRef.current.value,
  //       second_name: second_name.current.value,
  //       patronymic: patronymic.current.value,
  //       phone: phone.current.value,
  //       email: email.current.value,
  //       password: password.current.value,
  //       password_confirmation: password_confirmation.current.value,
  //     }),
  //   })
  //     .then((response) => response.text())
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }

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
      ).then((response) => console.log(response));
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }
  return (
    <>
      <div className="form_page_form_conteiner">
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
      //! LARAVEL form //! LARAVEL form //! LARAVEL form
      <hr />
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
