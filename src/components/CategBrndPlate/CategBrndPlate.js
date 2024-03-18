import "./CategBrndPlate.css";
import { CategoryContext } from "../../context";
import { BrandContext } from "../../context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export function CategBrndPlate(props) {
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [brandContext, setBrandContext] = useContext(BrandContext);
  const [redToggle, setRedToggle] = useState(false);
  const [newName, setNewName] = useState();

  let disabled;
  if (!newName) {
    disabled = "disabled";
  }

  async function deleteCategory() {
    let conf = window.confirm(
      "Хотите удалить категорию " + props?.item?.category_name + " ?"
    );
    if (conf) {
      fetch(
        "http://oilmarket1/delCategory/index.php/?category_id=" + props.item.id
      )
        .then((response) => response.json())

        .then((response) => {
          setCategoryContext(response);
        });
    }
  }

  async function deleteBrand() {
    let conf = window.confirm(
      "Хотите удалить бренд " + props?.item?.brand_name + " ?"
    );
    if (conf) {
      fetch("http://oilmarket1/delBrand/index.php/?brand_id=" + props.item.id)
        .then((response) => response.json())

        .then((response) => {
          setBrandContext(response);
        });
    }
  }
  async function updateBrand() {
    fetch("http://oilmarket1/updateBrand/index.php", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        id: props.item.id,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        setBrandContext(response);
      });
  }
  async function updateCategory() {
    fetch("http://oilmarket1/updateCategory/index.php", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        id: props.item.id,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        setCategoryContext(response);
      });
  }
  return (
    <div className="cat_br_pl_wrapper">
      {props?.item?.category_name || props?.item?.brand_name ? (
        <div className="cat_br_pl_item2">
          <div className="cat_br_pl_item">
            <div style={{ marginRight: "3vw" }}>
              <Link
                style={{ color: "white" }}
                to={`/chars_values_of_cat/${props?.item?.id}`}
              >
                {props?.item?.category_name}
              </Link>
              {props?.item?.brand_name}
            </div>
            <div>
              {props?.item?.category_name && (
                <button onClick={deleteCategory} style={{ marginRight: "3vw" }}>
                  Удалить X
                </button>
              )}

              {props?.item?.brand_name && (
                <button onClick={deleteBrand} style={{ marginRight: "3vw" }}>
                  Удалить X
                </button>
              )}
              <button onClick={() => setRedToggle(!redToggle)}>
                Редактировать
              </button>
            </div>

            {redToggle && (
              <div>
                <label>
                  Новое значение:
                  <input
                    id="newName"
                    name="newName"
                    className="input_form"
                    type="text"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                </label>
                {props?.item?.brand_name && (
                  <button disabled={disabled} onClick={updateBrand}>
                    Применить
                  </button>
                )}
                {props?.item?.category_name && (
                  <button disabled={disabled} onClick={updateCategory}>
                    Применить
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
