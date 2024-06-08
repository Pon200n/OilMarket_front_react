import { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { LinkRer } from "./LinkRer";
// import {
//   GridReadyEvent,
//   GridApi,
//   ColumnApi,
//   ColDef,
//   ICellRendererParams
// } from "ag-grid-community";
import "./OrderAdmin.css";

import { mobxContext } from "../..";
import { observer } from "mobx-react";
import { getAllOrders } from "../../http/orderAPI";
import moment from "moment";

const OrderAdmin = observer(() => {
  const { order } = useContext(mobxContext);
  const { service } = useContext(mobxContext);

  async function getOrdersLara() {
    try {
      await getAllOrders().then((response) => {
        console.log("allOrders order admin page", response);
        order.setAllOrders(response.data);
      });
    } catch (e) {
      service.setErrorMessage(e.message);
    }
  }
  // ? not lara
  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    getOrdersLara();
  }, []);
  const defaultColDef = useMemo(() => ({
    filter: true,
  }));
  const autoSizeStrategy = {
    type: "fitCellContents",
  };
  function LinkComponent(props) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={"https://www.google.com"}
      >
        {props.value}
      </a>
      // <Link to={`/order_page_admin_redact/${props?.item?.id}`}>
      //   {props?.item?.order_status_description}
      // </Link>
    );
  }

  // * lara 07.06.2024
  const colDefsLara = [
    { field: "id", cellRenderer: LinkRer },
    { headerName: "Имя", field: "user_name" },
    { headerName: "Фамилия", field: "user_second_name" },
    { headerName: "Отчество", field: "user_patronymic" },
    { headerName: "Телефон", field: "user_phone" },
    { headerName: "Email", field: "user_email" },
    { headerName: "Время заказа", field: "created_at" },
    { headerName: "Статус", field: "order_status" },
    { headerName: "Адрес доставки", field: "delivery_place" },
  ];

  return (
    <>
      <div className="head">
        <h3>Информация о заказах</h3>
      </div>

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={order.all_orders}
          columnDefs={colDefsLara}
          defaultColDef={defaultColDef}
          pagination={true}
          autoSizeStrategy={autoSizeStrategy}
          // frameworkComponents={{
          //   LinkComponent,
          // }}
          reactiveCustomComponents
        />
      </div>
    </>
  );
});
export default OrderAdmin;
