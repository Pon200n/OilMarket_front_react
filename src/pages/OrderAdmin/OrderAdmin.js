import { useEffect, useState, useMemo } from "react";
import { OrderForAdminPlate } from "../../components/OrderForAdminPlate/OrderForAdminPlate";
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
export function OrderAdmin() {
  const [adminOrders, setAdminOrders] = useState([]);
  function getOrdersForAdmin() {
    fetch("http://oilmarket1/getOrdersForAdmin/index.php")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAdminOrders(response);
      });
  }
  useEffect(() => {
    getOrdersForAdmin();
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
  const [colDefs, setColDefs] = useState([
    { field: "id", cellRenderer: LinkRer },
    { field: "nikName" },
    // {
    //   field: "nikName",
    //   cellRenderer: (params) => {
    //     var link = document.createElement("a");
    //     link.href = "#";
    //     link.innerText = params.value;
    //     link.addEventListener("click", (e) => {
    //       e.preventDefault();
    //       console.log(params.data.id);
    //     });
    //     return link;
    //   },
    // },
    { headerName: "Имя", field: "firstName" },
    { headerName: "Фамилия", field: "lastName" },
    { headerName: "Отчество", field: "patronymic" },
    { headerName: "Телефон", field: "phone" },
    { headerName: "Время сервера", field: "order_server_time" },
    { headerName: "Время устройства", field: "order_user_time" },
    { headerName: "Статус", field: "order_status_description" },
    { headerName: "Адрес доставки", field: "delivery_place" },
  ]);
  return (
    <>
      <div className="head">
        <h3>Информация о заказах</h3>
      </div>
      <button onClick={getOrdersForAdmin}>get orders</button>
      {/* <table>
        <thead>
          <tr>
            <th>ID заказа</th>
            <th>Nik</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Номер телефона</th>
            <th>Время заказа на сервере</th>
            <th>Время заказа на устройстве</th>
            <th>Статус заказа</th>
            <th>Адрес доставки</th>
          </tr>
        </thead>
        <tbody>
          {adminOrders &&
            adminOrders.map((item) => (
              <OrderForAdminPlate key={item.id} item={item} />
            ))}
        </tbody>
      </table> */}
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={adminOrders}
          columnDefs={colDefs}
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
}
