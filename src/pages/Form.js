import React, { useState } from "react";

export function Form() {
  const [img, setImg] = useState();
  const [resp, setResp] = useState();
  // const [res, setResponse] = useState("none");

  // загрузка файла start

  let selectFile = (e) => {
    const formData = new FormData();

    formData.append("file", e.target.files[0], e.target.files[0].name);

    console.log([...formData.entries()]);
    fetch("http://oilmarket1/getFile/index.php", {
      method: "POST",
      header: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResp(response);
      });
  };
  // console.log(file);

  // загрузка файла end
  function getStatic() {
    fetch("http://oilmarket1/getStatic/index.php", {
      method: "GET",
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.blob())
      .then((response) => {
        setImg(URL.createObjectURL(response));

        console.log(response);
      });
  }

  return (
    <>
      <h1>test</h1>
      <h1>{resp}</h1>
      <button
        className="form_input_button"
        style={{ width: "200px" }}
        onClick={getStatic}
      >
        Get img from serv
      </button>
      <img className="img_single" src={img} />
      <img className="img_single" src={"http://oilmarket1/static/oil1.jpg"} />
      <br />
      <br />

      {/* <label>
        Название:
        <input
          id="name"
          name="name"
          className="input_form"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label> */}
      <input
        id="file"
        name="file"
        type="file"
        accept=".jpg,.jpeg"
        onChange={selectFile}
      ></input>

      <br />
      <br />
      <br />
      <form
        action="http://oilmarket1/getFile/index.php"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="file" onChange={selectFile}></input>
      </form>
    </>
  );
}
