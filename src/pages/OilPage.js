import { items } from "../components/products";
import { Card } from "../components/Card";
import { Context } from "../context";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

export function OilPage() {
  const router = useParams();

  console.log(router);

  const [context, setContext] = useContext(Context);

  function add(product) {
    let findProd = context.find((item) => item.id === product.id);
    if (product.id === findProd?.id) {
      alert("Этот товар уже есть в корзине");
    } else {
      context.push({ ...product });
      setContext([...context]);
    }
  }

  let OilItem = items.filter((item) => item.category === router.category);
  console.log(OilItem);

  return (
    <>
      <h3>
        {router.category} {OilItem.length} ед.
      </h3>
      {OilItem.map((xProd) => (
        <Card key={xProd.id} item={xProd} addOnBasket={() => add(xProd)} />
      ))}
    </>
  );
}
