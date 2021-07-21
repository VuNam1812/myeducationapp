// @flow
import React, { useState, useEffect } from "react";
import { componentWillAppendToBody } from "react-append-to-body";
import "./style.scss";
import $ from "jquery";
export const Modal = componentWillAppendToBody(
  ({ state, children, className, onClickOverlay }) => {
    const [isShow, setShow] = useState(null);
    useEffect(() => {
      switch (state) {
        case "visible":
          setShow(true);
          
          document.body.style = `overflow-y: hidden; padding-right: ${$(window).height() >= document.body.offsetHeight ? '0px' : '1.22vw'}`;
          break;
        case "close":
          setShow(false);
          document.body.style = "overflow-y: auto; padding-right: 0px";
          break;

        default:
          break;
      }
    }, [state, isShow]);

    return (
      <div
        className={`modal ${className || ""} 
                        ${
                          isShow
                            ? "modal--open"
                            : isShow === null
                            ? "modal--hidden"
                            : "modal--close"
                        }`}
        onClick={(e) => {
          if (e.target.className.includes("modal--open")) {
            onClickOverlay();
          }
        }}
      >
        <div className="modal__body">{children}</div>
      </div>
    );
  }
);
