import { BasketCard } from "../components/BasketCard";
import React, { useContext } from "react";
import { Context } from "../context";
import { CardFooter } from "../components/CardFooter";

export function BasketPage() {
  const [context, setContext] = useContext(Context);

  function deleteFromB(id, objProd) {
    context.splice(context.indexOf(objProd), 1);
    setContext([...context]);
  }

  function incr(id) {
    setContext((context) => {
      return context.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: ++product.count,
            priceTotal: product.count * product.price,
          };
        }

        return product;
      });
    });
  }
  function dicr(id) {
    setContext((context) => {
      return context.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: product.count - 1 > 1 ? product.count - 1 : 1,
            priceTotal:
              (product.count - 1 > 1 ? --product.count : 1) * product.price,
          };
        }

        return product;
      });
    });
  }
  function chengeValue(id, value) {
    setContext((context) => {
      return context.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: value,
            priceTotal: value * product.price,
          };
        }

        return product;
      });
    });
  }

  let display;
  let height = "27vw";
  let basketItem = context.map((p) => (
    <BasketCard
      key={p.id}
      p={p}
      deleteFromBasket={() => deleteFromB(p.id, p)}
      incr={() => incr(p.id)}
      dicr={() => dicr(p.id)}
      chengeValue={chengeValue}
    />
  ));

  if (context.length > 0) {
    display = "none";
  } else {
    display = "block";
  }

  return (
    <React.Fragment>
      <div style={{ display: display, height: height }}>
        <h1>Сейчас ваша корзина товаров пуста :(</h1>
      </div>
      {basketItem}
      <CardFooter />
    </React.Fragment>
  );
}
