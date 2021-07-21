// @flow
import React, { useState, useRef } from "react";
import "./style.scss";

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    boxSizing: "boder-box",
    padding: "1rem",
    display: "flex",
    minWidth: "20rem",
    borderRadius: "0.5rem",
    boxShadow: "0px 0px 5px rgb(108 117 125 / 20%)",
  },
}))(Tooltip);
export const Card = (props) => {
  const cardRef = useRef(null);
  const [direct, setDirect] = useState("right");

  const handleMouseEnter = (e) => {
    if (cardRef.current.classList.contains("popover--hidden")) return;
    const offsetCenterLeft = e.clientX + +(cardRef.current.offsetWidth / 2);
    const offsetCenterWidth = document.body.offsetWidth / 2;
    const classString =
      offsetCenterLeft / offsetCenterWidth > 1 ? "left" : "right";
    setDirect(classString);
  };
  return (
    <div
      className={`card ${props.className}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
    >
      <HtmlTooltip
        TransitionProps={{ timeout: 300 }}
        enterNextDelay={1000}
        enterDelay={1000}
        className="tooltip"
        placement={direct}
        title={props.popover}
        interactive
      >
        {props.children ? props.children : <p></p>}
      </HtmlTooltip>
    </div>
  );
};
