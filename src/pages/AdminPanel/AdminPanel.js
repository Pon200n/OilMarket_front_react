import { Link } from "react-router-dom";
export function AdminPanel() {
  return (
    <>
      <div className="content_wrapper">
        <div className="head">
          <h2>Админпанель</h2>
        </div>
        <div className="buttonWrapper">
          <div className="btnI">
            <Link to="/createProduct" className="btn_PA">
              Добавить товар
            </Link>
          </div>
          <div className="btnI">
            <Link to="/add_category" className="btn_PA">
              Категории
            </Link>
          </div>

          <div className="btnI">
            <Link to="/add_brand" className="btn_PA">
              Бренды
            </Link>
          </div>
          <div className="btnI">
            <Link to="/order_admin" className="btn_PA">
              Заказы
            </Link>
            <Link to="/status_order_redact" className="btn_PA">
              Редактировать статусы заказа
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
