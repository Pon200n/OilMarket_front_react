import { useContext, useEffect, useState } from "react";
import ValueSelectBarLara from "../../components/ValueSelectBarLara/ValueSelectBarLara";

import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { addProduct } from "../../http/productAPI";
import "./CreateProductForm.css";
const CreateProductForm = observer(() => {
  const { product } = useContext(mobxContext);

  // const [img, setImg] = useState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(0);
  const [values, setValues] = useState([]);
  const [description, setDescription] = useState([]);

  //*валидация поле цена
  let color;
  let display;
  if (price) {
    display = "none";
  } else {
    display = "block";
    color = "red";
  }

  //* валидация кнопки
  let disabled;
  let styleContainer;
  if (name && brand && price && category && description) {
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

  //* загрузка файла Laravel

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    product.setProductValues([]);
  }, [category]);

  // ***lara

  let filtratedChars;
  if (product.categories) {
    filtratedChars = product.chars.filter((char) => {
      if (char?.category_id === +category) {
        return char;
      }
    });
  }

  async function addProductLara() {
    const formData = new FormData();
    formData.append("file", file);
    //* console.log([...formData.entries()]);
    // formData.append("values", product.productValues);
    product.productValues.forEach((value, index) => {
      formData.append(`values[${index}][char_id]`, value.char_id);
      formData.append(`values[${index}][value]`, value.value);
    });
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category_id", category);
    formData.append("brand_id", brand);
    // formData.append("img", img);
    formData.append("description", description);
    let qv = window.confirm("Добавить товар?");
    if (qv) {
      try {
        await addProduct(formData).then((response) => {
          console.log(response.data);
          product.setProducts(response.data);
          alert(response.status);
        });
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Добавить товар lara</h2>
      </div>

      <div className="form_page_form_conteiner">
        <div>
          <label>
            Название:
            <input
              id="name"
              name="name"
              className="input_form"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <br />
          <label>
            Категория:
            <select
              id="category"
              name="category"
              // defaultValue={categoryContext.category_name}
              className="input_form"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value=""></option>
              {product.categories ? (
                product.categories.map((x) => (
                  <option value={x.id} key={x.id}>
                    {x.category_name}
                  </option>
                ))
              ) : (
                <div>нет данных</div>
              )}
            </select>
          </label>
          <br />
          {filtratedChars &&
            filtratedChars.map((char) => (
              <div style={{ margin: "10px" }} key={char?.id}>
                <label>
                  {char?.char_name} {char?.id}
                </label>
                <ValueSelectBarLara v={values} char={char} />
              </div>
            ))}

          <br />
          <label>
            Цена:
            <input
              id="price"
              name="price"
              className="input_form"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
          <br />
          <label>
            Производитель:
            <select
              id="manufact"
              name="manufact"
              // defaultValue="Масло моторное"
              className="input_form"
              onChange={(event) => setBrand(event.target.value)}
            >
              <option></option>
              {product.brands ? (
                product.brands.map((x) => (
                  <option value={x.id} key={x.id}>
                    {x.brand_name}
                  </option>
                ))
              ) : (
                <div>нет данных</div>
              )}
            </select>
          </label>
          <br />
          <label>
            Описание товара:
            <input
              id="description"
              name="description"
              className="input_form"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <br />
          <button
            type="submit"
            // disabled={disabled}
            // style={styleContainer}
            className="form_input_button"
            onClick={addProductLara}
          >
            Отправить
          </button>

          <input type="file" name="file" onChange={handleFileChange} />
        </div>
      </div>
    </>
  );
});
export default CreateProductForm;
