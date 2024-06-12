import { Link } from "react-router-dom";
import { observer } from "mobx-react";

export const HeaderSubBrandMenu = observer((props) => {
  return (
    <>
      {props.exist_brands &&
        props?.exist_brands.map((brnd) => (
          <Link
            className="s_sub_m_it2"
            key={brnd?.brand?.id}
            to={`/category_page/${brnd?.category_id}/${brnd?.brand_id}`}
          >
            {brnd?.brand?.brand_name}
          </Link>
        ))}
    </>
  );
});

export default HeaderSubBrandMenu;
