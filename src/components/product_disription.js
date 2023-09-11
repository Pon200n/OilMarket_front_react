import { items } from "../components/products";
import { useHistory, useParams } from "react-router-dom";

export function DiscriptionOil(props) {
  const router = useParams();

  let item = items.find((item) => item.id == router.id);

  for (let i = 0; i < item.discr.length; i++)
    return (
      <div>
        <h2>Описание</h2>
        {item.discr?.map((d) => (
          <p>{d}</p>
        ))}
      </div>
    );
}
