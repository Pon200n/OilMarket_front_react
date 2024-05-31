import { useContext, useEffect, useState } from "react";
import { SelectComponent } from "../../components/SelectComponent/SelectComponent";
import { ValueSelectBar } from "../../components/ValueSelectBar/ValueSelectBar";
import ValueSelectBarLara from "../../components/ValueSelectBarLara/ValueSelectBarLara";
import { CategoryContext } from "../../context";
import { BrandContext } from "../../context";
import { CharsValuesContext } from "../../context";
import { observer } from "mobx-react";
import { mobxContext } from "../..";
import { addProduct } from "../../http/productAPI";
const CreateProductForm = observer(() => {
  const { product } = useContext(mobxContext);

  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [brandContext, setBrandContext] = useContext(BrandContext);

  const [req, setReq] = useState();
  const [img, setImg] = useState("img");
  // const [id, setID] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [price, setPrice] = useState("");
  const [manufact, setManufact] = useState("");
  const [countryManufact, setCountryManufact] = useState("");
  const [baseOilType, setBaseOilType] = useState("Синтетическое");
  const [engineType, setEngineType] = useState("");
  const [SAE, setSAE] = useState("");
  const [API, setAPI] = useState("");
  const [ILSAC, setILSAC] = useState("");
  const [tolerances, setTolerances] = useState("");
  const [volume, setVolume] = useState("");
  const [reccomend, setReccomend] = useState("");
  const [discr, setDiscr] = useState("");
  const [file, setFile] = useState(0);
  const [charsNames, setCharsNames] = useState([]);
  const [allCharsNames, setAllCharsNames] = useState([]);
  const [values, setValues] = useState([]);
  const [description, setDescription] = useState([]);

  const [charsValuesContext, setCharsValuesContext] =
    useContext(CharsValuesContext);

  function clickHandler() {
    let qv = window.confirm("Отправить запрос на добавление товара?");
    if (qv) {
      fetch("http://oilmarket1/addProduct/index.php", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category,
          img,
          price,
          manufact,
          countryManufact,
          baseOilType,
          engineType,
          SAE,
          API,
          ILSAC,
          tolerances,
          volume,
          reccomend,
          discr,
          prodCharsValues: JSON.stringify(charsValuesContext),
        }),
      })
        .then((response) => response.text())
        .then((response) => {
          setReq(response);
        });
    }
  }
  //валидация поле цена
  let color;
  let display;
  if (price) {
    display = "none";
  } else {
    display = "block";
    color = "red";
  }

  // валидация кнопки
  let disabled;

  let styleContainer;
  if (name && manufact && price && countryManufact) {
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
  //   console.log(disabled);
  //   console.log(name);

  // загрузка файла
  let selectFile = (e) => {
    const formData = new FormData();

    formData.append("file", e.target.files[0], e.target.files[0].name);

    // console.log([...formData.entries()]);
    fetch("http://oilmarket1/getFile/index.php", {
      method: "POST",
      header: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        setImg(response);
      });
  };

  // function state() {
  //   if (charsNames) {
  //     charsNames.map((x) => (window[({ x }, "set" + { x })] = useState()));
  //   }
  // }

  function getChars() {
    fetch(
      "http://oilmarket1/getCharNameOfCatID/index.php/?categoryID=" + category
    )
      .then((response) => response.json())
      .then((response) => {
        let chars = response?.chars;
        let all_chars = response?.all_chars;
        let values_res = response?.values;
        // console.log("response", response);
        // console.log("values", values_res);
        setCharsNames(chars);
        setAllCharsNames(all_chars);
        setValues(values_res);
      });
  }

  let newFiltredChars;

  if (category) {
    newFiltredChars = allCharsNames.filter((char) => {
      if (char?.category_id === +category) {
        return char;
      }
    });
  }

  useEffect(() => {
    getChars();
    setCharsValuesContext([]);
    product.setProductValues([]);
  }, [category]);

  // ***lara
  const [brand, setBrand] = useState("");

  let filtratedChars;
  if (product.categories) {
    filtratedChars = product.chars.filter((char) => {
      if (char?.category_id === +category) {
        return char;
      }
    });
  }
  // console.log("filtratedChars", filtratedChars);
  // console.log("product.categories", product.categories);
  // console.log("product.productValues", product.productValues);

  async function addProductLara() {
    try {
      await addProduct(
        name,
        price,
        category,
        brand,
        product.productValues,
        img,
        description
      ).then((response) => {
        console.log(response.data);
        product.setProducts(response.data);
      });
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>
      {/* <>
        <h5>{req}</h5>
        <h5>{img}</h5>
        <h5>{category}</h5>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Добавить товар</h2>
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
                {categoryContext ? (
                  categoryContext.map((x) => (
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

            {newFiltredChars &&
              newFiltredChars.map((n) => (
                <div style={{ margin: "10px" }} key={n?.id}>
                  <label>
                    {n?.char_name} {n?.id}
                  </label>
                  <ValueSelectBar v={values} n={n} />
                </div>
              ))}

            <br />

            <label>
              (Путь к файлу изображения):
              <input
                id="img"
                name="img"
                className="input_form"
                type="text"
                value={img}
                onChange={(event) => setImg(event.target.value)}
              />
            </label>
            <br />
            <label style={{ color: color }}>
              Цена:
              <input
                style={{ border: "1px solid", color }}
                id="price"
                name="price"
                className="input_form"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </label>
            <div style={{ display: display, color: color }}>
              Необходимо заполнить поле
            </div>
            <br />
            <label>
              Производитель:
              <select
                id="manufact"
                name="manufact"
                // defaultValue="Масло моторное"
                className="input_form"
                onChange={(event) => setManufact(event.target.value)}
              >
                {brandContext ? (
                  brandContext.map((x) => (
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
              Страна производства:
              <input
                id="countryManufact"
                name="pricountryManufactce"
                className="input_form"
                type="text"
                value={countryManufact}
                onChange={(event) => setCountryManufact(event.target.value)}
              />
            </label>
            <br />
            <label>
              Тип базового масла:
              <select
                id="baseOilType"
                name="baseOilType"
                defaultValue="Синтетическое"
                className="input_form"
                onChange={(event) => setBaseOilType(event.target.value)}
              >
                <option value="Синтетическое">Синтетическое</option>
                <option value="Полусинтетическое">Полусинтетическое</option>
                <option value="Минеральное">Минеральное</option>
              </select>
            </label>
            <br />
            <label>
              Тип двигателя:
              <select
                id="engineType"
                name="engineType"
                defaultValue=""
                className="input_form"
                onChange={(event) => setEngineType(event.target.value)}
              >
                <option value="Бензиновый">Бензиновый</option>
                <option value="Дизельный">Дизельный</option>
                <option value=""></option>
              </select>
            </label>
            <br />
            <label>
              SAE:
              <input
                id="SAE"
                name="SAE"
                className="input_form"
                type="text"
                value={SAE}
                onChange={(event) => setSAE(event.target.value)}
              />
            </label>
            <br />
            <label>
              API:
              <input
                id="API"
                name="API"
                className="input_form"
                type="text"
                value={API}
                onChange={(event) => setAPI(event.target.value)}
              />
            </label>
            <br />
            <label>
              ILSAC:
              <input
                id="ILSAC"
                name="ILSAC"
                className="input_form"
                type="text"
                value={ILSAC}
                onChange={(event) => setILSAC(event.target.value)}
              />
            </label>
            <br />
            <label>
              Допуски GM:
              <input
                id="tolerances"
                name="tolerances"
                className="input_form"
                type="text"
                value={tolerances}
                onChange={(event) => setTolerances(event.target.value)}
              />
            </label>
            <br />
            <label>
              Объем тары:
              <input
                id="volume"
                name="volume"
                className="input_form"
                type="text"
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
              />
            </label>
            <br />
            <label>
              Другие допуски:
              <input
                id="reccomend"
                name="reccomend"
                className="input_form"
                type="text"
                value={reccomend}
                onChange={(event) => setReccomend(event.target.value)}
              />
            </label>
            <br />
            <label>
              Описание:
              <input
                id="discr"
                name="discr"
                className="input_form"
                type="text"
                value={discr}
                onChange={(event) => setDiscr(event.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={selectFile}
              ></input>
            </label>
            <img
              style={{ height: "100px" }}
              src={"http://oilmarket1/static/" + img}
            />
            <button
              type="submit"
              disabled={disabled}
              style={styleContainer}
              className="form_input_button"
              onClick={clickHandler}
            >
              Отправить
            </button>
          </div>
        </div>
      </> */}
      {/* lara form !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
      {/* lara form !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
      {/* lara form !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}

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
          <label>
            (Путь к файлу изображения):
            <input
              id="img"
              name="img"
              className="input_form"
              type="text"
              value={img}
              onChange={(event) => setImg(event.target.value)}
            />
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
        </div>
      </div>
    </>
  );
});
export default CreateProductForm;
