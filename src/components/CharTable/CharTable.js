import { useEffect } from "react";
import { useState } from "react";
import "./CharTable.css";
export function Table(props) {
  const [sortTable, setSortTable] = useState([]);
  // let i = [
  //   { characteristic: { char_name: "b" }, value_name: "3" },
  //   { characteristic: { char_name: "v" }, value_name: "3" },
  //   { characteristic: { char_name: "b" }, value_name: "3" },
  //   { characteristic: { char_name: "b" }, value_name: "3" },
  //   { characteristic: { char_name: "c" }, value_name: "4" },
  //   { characteristic: { char_name: "v" }, value_name: "6" },
  //   { characteristic: { char_name: "v" }, value_name: "1" },
  //   { characteristic: { char_name: "v" }, value_name: "2" },
  //   { characteristic: { char_name: "v" }, value_name: "5" },
  // ];
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
  let i = props?.charsLara;

  let i2 = [];
  function ecual() {
    for (let l = 0; l < i.length; ++l) {
      let equalValues2 = [];
      for (let ii = 0; ii < i.length; ++ii) {
        if (
          i[l]?.characteristic?.char_name === i[ii]?.characteristic?.char_name
        ) {
          i2 = i2.filter((f) => {
            return (
              f.characteristic?.char_name !== i[ii].characteristic?.char_name
            );
          });
          equalValues2.push(i[ii]?.value_name);
          i2.push({
            characteristic: { char_name: i[l].characteristic?.char_name },
            value_name: `${equalValues2}`,
          });
        } else {
        }
      }
    }
    setSortTable(i2);
  }
  // function ecual() {
  //   for (let l = 0; l < i.length; ++l) {
  //     let equalValues2 = [];
  //     for (let ii = 0; ii < i.length; ++ii) {
  //       if (i[l]?.char_name === i[ii]?.char_name) {
  //         i2 = i2.filter((f) => {
  //           return f.char_name !== i[ii].char_name;
  //         });
  //         equalValues2.push(i[ii]?.value_name);
  //         i2.push({
  //           char_name: i[l].char_name,
  //           value_name: `${equalValues2}`,
  //         });
  //       } else {
  //       }
  //     }
  //   }
  //   setSortTable(i2);
  // }
  useEffect(() => {
    ecual();
  }, []);
  return (
    <>
      <div>
        <h3 className="char_text">Основные характеристики</h3>
        <div className="char_table">
          <table>
            <tbody>
              {sortTable?.map((s) => (
                <tr key={s.id}>
                  <th>{s.characteristic.char_name}</th>
                  <th>{s.value_name}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
