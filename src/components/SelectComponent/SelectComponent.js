export function SelectComponent(props) {
  return (
    <div className="form_page_form_conteiner">
      <div>
        <label>
          {props?.p?.char_name}:
          <input
            id="name"
            name="name"
            className="input_form"
            type="text"
            value={props?.p?.char_name}
            //   onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
      </div>
    </div>
  );
}
