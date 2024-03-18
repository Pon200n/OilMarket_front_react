import React from "react";
import { Link } from "react-router-dom";
export function LinkRer(props) {
  return (
    <>
      {/* <span>{props?.value}</span> */}

      {/* <button
        onClick={() => {
          console.log(props?.value);
        }}
      >
        click
      </button> */}
      <Link to={`/order_page_admin_redact/${props?.value}`}>
        <button>{props?.value}</button>
      </Link>
    </>
  );
}
