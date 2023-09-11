export function add(product) {
  let findProd = context.find((item) => item.id === product.id);
  if (product.id === findProd?.id) {
    alert("Этот товар уже есть в корзине");
  } else {
    context.push({ ...product });
    setContext([...context]);
  }
}
