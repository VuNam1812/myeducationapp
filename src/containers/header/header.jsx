// @flow
import React, { useContext } from "react";
import { HeaderTop } from "./HeaderTop/headerTop";
import { HeaderUpper } from "./HeaderUpper/headerUpper";
import { authContext } from "../../contexts/auth/authContext";
export const Header = (props) => {
  const { store_auth } = useContext(authContext);
  return (
    <div className="header">
      {store_auth.auth === false && (
        <HeaderTop className="header--zoom-80"></HeaderTop>
      )}
      <HeaderUpper
        className={"header--zoom-80"}
        offsetTop={store_auth.auth ? 0 : 67.19}
      ></HeaderUpper>
    </div>
  );
};
