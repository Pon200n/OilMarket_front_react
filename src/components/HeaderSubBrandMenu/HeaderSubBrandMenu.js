import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BrandsOfCategoryContext } from "../../context";

export function HeaderSubBrandMenu(props) {
  const [brandsOfCategoryContext, setBrandsOfCategoryContext] = useContext(
    BrandsOfCategoryContext
  );
  // console.log("br cat cont", brandsOfCategoryContext);

  let firstBrands = brandsOfCategoryContext.filter(function (brand) {
    return brand.category === props?.categoryID;
  });
  // console.log("результат", firstBrands);

  // const [brndsOfCat, setBrndsOfCat] = useState([]);
  // function getBrandsOfCategory() {
  //   fetch(
  //     "http://oilmarket1/getBrandsOfCategory/index.php/?categoryID=" +
  //       props?.categoryID
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log("brandsbyid", response);
  //       setBrndsOfCat(response);
  //     });
  // }
  // useEffect(() => {
  //   getBrandsOfCategory();
  // }, []);
  return (
    <>
      {/* <div>IDcat {props?.categoryID}</div> */}
      {/* <button onClick={getBrandsOfCategory}>Получить бренды</button> */}
      {firstBrands &&
        firstBrands.map((brnd) => (
          <Link
            className="s_sub_m_it2"
            key={brnd.manufact}
            to={`/category_page/${props?.categoryID}/${brnd?.manufact}`}
          >
            {brnd?.brand_name}
          </Link>
        ))}
    </>
  );
}
