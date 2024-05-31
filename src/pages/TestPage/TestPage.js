import React from "react";
// import { mobxContext } from "../../App";
import { mobxContext } from "../../index";

import { useContext } from "react";
import { observer } from "mobx-react";

export const TestPage = observer(() => {
  const { user } = useContext(mobxContext);
  return (
    <div>
      <h1>Test page</h1>
      <button
        onClick={() => {
          user.setTestUser("testpage");
        }}
      >
        new name
      </button>
      {user.testUser}
    </div>
  );
});
