import { Link } from "react-router-dom";

export function OrderForAdminPlate(props) {
  return (
    // <table border={1}>
    <tr>
      <td>{props?.item?.id}</td>
      <td>{props?.item.nikName}</td>
      <td>{props?.item?.lastName}</td>
      <td>{props?.item.firstName}</td>
      <td>{props?.item?.patronymic}</td>
      <td>{props?.item?.phone}</td>
      <td>{props?.item?.order_server_time}</td>
      <td>{props?.item?.order_user_time}</td>
      <td>
        <Link to={`/order_page_admin_redact/${props?.item?.id}`}>
          {props?.item?.order_status_description}
        </Link>
      </td>
      <td>{props?.item?.delivery_place}</td>
    </tr>
    // </table>
  );
}
