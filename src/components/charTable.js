import { items } from "../components/products";
import { useHistory, useParams } from "react-router-dom";

export function Table(props) {
  const router = useParams();

  let item = items.find((item) => item.id == router.id);

  return (
    <div className="char_text">
      <h2>Основные характеристики</h2>
      <table>
        {item.characterArr?.map((s) => (
          <tr>
            <th>{s.name}</th>
            <th>{s.value}</th>
          </tr>
        ))}
      </table>
    </div>
  );
}
