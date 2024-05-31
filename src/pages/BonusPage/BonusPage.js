// import { mobxContext } from "../../App";
import { mobxContext } from "../../index";
import { useContext } from "react";
import { observer } from "mobx-react";
import "./BonusPage.css";
// export function BonusPage() {
//   const { user } = useContext(mobxContext);
//   console.log("user mobx", user);
//   return (
//     <>
//       <h1>BonusPage</h1>
//       {user.testUser}
//       {user && <span>{user.isAuth}</span>}
//       <button
//         onClick={() => {
//           user.setTestUser("qcqcqc ");
//         }}
//       >
//         new name
//       </button>
//     </>
//   );
// }

const BonusPage = observer(() => {
  const { user } = useContext(mobxContext);
  console.log("user mobx", user);
  return (
    <>
      <h1>BonusPage</h1>
      <button
        onClick={() => {
          user.setTestUser("BonusPage ");
        }}
      >
        new name
      </button>
      {user.testUser}
    </>
  );
});
export default BonusPage;
