export function PaginationPanel(props) {
  console.log(props);
  return (
    <>
      <button className="pag_but_Pm" onClick={props?.setPage}>
        {/* <button className="pag_but_Pm" onClick={() => console.log(props?.p + 1)}> */}
        {props?.p + 1}
      </button>
    </>
  );
}
