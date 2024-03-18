import { useEffect } from "react";
import { useState } from "react";

export function Table(props) {
  const [sortTable, setSortTable] = useState([]);

  // let i = [
  //   { char_name: "b", value_name: "3" },
  //   { char_name: "v", value_name: "3" },
  //   { char_name: "b", value_name: "3" },
  //   { char_name: "b", value_name: "3" },
  //   { char_name: "c", value_name: "4" },
  //   { char_name: "v", value_name: "6" },
  //   { char_name: "v", value_name: "1" },
  //   { char_name: "v", value_name: "2" },
  //   { char_name: "v", value_name: "5" },
  // ];
  let i = props?.chars;

  let i2 = [];
  let equalValues = [];
  function ecual() {
    for (let l = 0; l < i.length; ++l) {
      let equalValues2 = [];
      for (let ii = 0; ii < i.length; ++ii) {
        if (i[l]?.char_name === i[ii]?.char_name) {
          i2 = i2.filter((f) => {
            return f.char_name !== i[ii].char_name;
          });
          equalValues2.push(i[ii]?.value_name);
          i2.push({
            char_name: i[l].char_name,
            value_name: `${equalValues2}`,
          });
        } else {
        }
      }
    }
    setSortTable(i2);
  }
  useEffect(() => {
    ecual();
  }, []);
  let item = props?.chars;
  return (
    <>
      {/* <div className="char_text">
        <h2>Основные характеристики</h2>
        <table>
          {item?.map((s) => (
            <tr key={s.id}>
              <th>{s.char_name}</th>
              <th>{s.value_name}</th>
            </tr>
          ))}
        </table>
        <button onClick={ecual}>ecual</button>
      </div> */}
      <div className="char_text">
        <h2>Основные характеристики(sort)</h2>
        <table>
          {sortTable?.map((s) => (
            <tr key={s.id}>
              <th>{s.char_name}</th>
              <th>{s.value_name}</th>
            </tr>
          ))}
        </table>
        {/* <button onClick={ecual}>ecual</button> */}
      </div>
    </>
  );
}
