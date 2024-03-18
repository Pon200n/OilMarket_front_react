import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import { useNavigate } from "react-router-dom";

export function TestPage() {
  useEffect(() => {
    GetTokenFromServ();
  }, []);
  const [userContext, setUserContext] = useContext(UserContext);

  const [userData, setUserData] = useState();

  async function GetTokenFromServ() {
    const token = localStorage.getItem("token"); // Или ваш ключ хранения токена
    // console.log(token);
    if (token) {
      await fetch("http://oilmarket1/tokenTest/tokenTest.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          //   "Content-Type": "applicaton/x-www-form-urlencoded",
        },
      })
        .then((response) => response.text())
        .then((response) => {
          JSON.parse(response);
          console.log(JSON.parse(response));
          setUserData(JSON.parse(response));
          setUserContext(JSON.parse(response));
        });
    } else {
      console.log("нет токена"); // Что-то если вдруг нет токена
    }
  }

  async function log() {
    // console.log(localStorage.getItem("token"));
    const tok = localStorage.getItem("token");
    console.log(tok);
  }
  const navigate = useNavigate();

  function redir() {
    navigate("/");
  }
  function clearLocalStorage() {
    localStorage.clear();
    setUserContext({});
    setUserData({});
    alert("Вы вышли из аккаунта.");
    redir();
  }
  let footHeight = document.querySelector("footer").offsetHeight;
  let headHeight = document.querySelector(".main_header").offsetHeight;
  let docHeigth = document.documentElement.clientHeight;
  let minHeight = docHeigth - (footHeight + headHeight);
  console.log(footHeight, headHeight, docHeigth, minHeight);
  return (
    <div className="content_wrapper" style={{ minHeight: minHeight }}>
      <h1>Token test</h1>

      {userData ? (
        <h1>
          id={userData?.id}; role={userData?.role}; nik={userData?.nik}
        </h1>
      ) : (
        <h1>нет данных</h1>
      )}
      <button onClick={GetTokenFromServ}>Get from serv</button>
      <button onClick={log}>Get token in log</button>
      <button onClick={clearLocalStorage}>Выйти из аккаунта</button>
      <button onClick={redir}>Редирект</button>
    </div>
  );
}
