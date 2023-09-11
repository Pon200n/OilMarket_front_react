import React, { useContext } from "react";
import { Card } from "../components/Card";
import { items } from "../components/products";
import { Context } from "../context";
import { useState } from "react";

let counter = 1;

export function Main() {
  const [context, setContext] = useContext(Context);
  let [itemsPage, setItems] = useState(items);

  function add(product) {
    let findProd = context.find((item) => item.id === product.id);

    if (product.id === findProd?.id) {
      alert("Этот товар уже есть в корзине");
    } else {
      context.push({ ...product });
      setContext([...context]);
    }
  }

  function sort() {
    itemsPage = itemsPage.sort((a, b) => {
      return (a.price - b.price) * counter;
    });
    counter *= -1;
    setItems([...itemsPage]);
    console.log(counter);
  }

  return (
    <React.Fragment>
      <div>
        <button className="c-button" onClick={sort}>
          сортировать по цене
        </button>
      </div>

      {itemsPage.map((xProd) => (
        <Card key={xProd.id} item={xProd} addOnBasket={() => add(xProd)} />
      ))}
    </React.Fragment>
  );
}
