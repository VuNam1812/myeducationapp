// @flow
import React, { useState, useEffect, useContext, useRef } from "react";
import "./style.scss";
import { Logo } from "../../../components";
import { Categories } from "./categories/categories";
import { UserAccount } from "./userAccount/userAccount";
import { authContext } from "../../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
export const HeaderUpper = (props) => {
  const headerUpper = useRef();
  const [height, setHeight] = useState(0);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { store_auth, logoutUser } = useContext(authContext);
  const [sticky, setSticky] = useState("");

  useEffect(() => {
    setHeight(+headerUpper.current.offsetHeight);

    const stickHandle = () => {
      if (
        $(window).scrollTop() > props.offsetTop &&
        localStorage.getItem("scroll") !== "sticky"
      ) {
        localStorage.setItem("scroll", "sticky");
        setSticky("sticky");
      }
      if (
        $(window).scrollTop() <= props.offsetTop &&
        localStorage.getItem("scroll") === "sticky"
      ) {
        localStorage.setItem("scroll", "");
        setSticky("");
      }
    };

    window.addEventListener("scroll", stickHandle);

    return () => {
      window.removeEventListener("scroll", stickHandle, false);
    };
  }, [props.offsetTop]);

  const logout = async () => {
    const alert = await Swal.fire({
      icon: "question",
      text: "Bạn có chắc chắn muốn đăng xuất?",
      showConfirmButton: true,
      confirmButtonText: "Xác Nhận",
      confirmButtonColor: "#00ab15",
      showCancelButton: true,
      cancelButtonText: "Hủy bỏ",
      cancelButtonColor: "#dc3545",
    });

    if (alert.isConfirmed) {
      await logoutUser();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      history.push(`/search?searchText=${searchText}`);
    }
  };

  return (
    <>
      <div
        className={`header-upper-cover ${sticky}`}
        style={{ height: `${height}px` }}
      ></div>
      <div
        className={`header-upper ${props.className} ${sticky}`}
        ref={headerUpper}
      >
        <div className="wrap">
          <Logo
            className="header-upper__logo"
            onClick={() => {
              history.push("/");
            }}
          ></Logo>
          <div className="header-upper__nav-search">
            <Categories></Categories>
            <div className="navigation">
              <div className="search">
                <input
                  placeholder="Nhập từ khóa bạn muốn tìm kiếm?"
                  className="search__input"
                  value={searchText}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <div
                  className="search__button"
                  onClick={() => {
                    history.push(`/search?searchText=${searchText}`);
                  }}
                >
                  <i className="fa fa-search fa-lg" aria-hidden="true"></i>
                </div>
              </div>
              {store_auth.auth && (
                <UserAccount
                  account={store_auth.account}
                  handlelogout={logout}
                ></UserAccount>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
