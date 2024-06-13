export function paginationLinks(active, pageCount) {
  let pagesLinksArr = [];

  //* let delta = Math.ceil(pageCount / 5 - 1);
  let delta = 5;
  let Start = active - delta;
  if (pageCount <= 20) {
    for (let i = 0; i < pageCount; i++) {
      pagesLinksArr.push(i + 1);
    }
  } else {
    if (Start > 0 && active + delta <= pageCount) {
      for (let start = active - (delta + 1); start < active + delta; start++) {
        pagesLinksArr.push(start + 1);
      }
    } else if (active + delta > pageCount) {
      for (let i = pageCount - (delta * 2 + 1); i < pageCount; i++) {
        pagesLinksArr.push(i + 1);
      }
    } else {
      for (let i = 0; i < delta * 2 + 1; i++) {
        pagesLinksArr.push(i + 1);
      }
    }
  }
  //   console.log(pagesLinksArr);
  return pagesLinksArr;
}
