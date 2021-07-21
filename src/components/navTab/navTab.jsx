// @flow
import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import "./style.scss";
export const NavTab = ({ headers, blocks, className, onChangeActive }) => {
  const [left, setLeft] = useState(0);
  const [active, setActive] = useState([
    "active",
    ...new Array(headers.length - 1).fill(""),
  ]);

  useEffect(() => {
    onChangeActive(0);
  }, []);

  const handleTab = (e) => {
    const index = +e.target.getAttribute("data-id");
    const distance = 100 / headers.length;
    setLeft(index * distance);
    const newActive = new Array(headers.length - 1).fill("");
    newActive[index] = "active";
    onChangeActive(+index);
    setActive(newActive);
  };
  return (
    <div className={`nav-tabs ${className}`}>
      <ul className="nav-tabs__header">
        <li
          className="nav-tabs__header-item tab-indicator"
          style={{ left: `${left}%`, width: `${100 / headers.length}%` }}
        ></li>
        {headers.map((text, index) => {
          return (
            <li
              data-id={index}
              className={`nav-tabs__header-item ${active[index]}`}
              onClick={handleTab}
            >
              {text}
            </li>
          );
        })}
      </ul>
      <div className="nav-tabs__content">
        {blocks.map((block, index) => {
          return (
            <div className={`nav-tabs__content-item ${active[index]}`}>
              {block}
            </div>
          );
        })}
      </div>
    </div>
  );
};

NavTab.propTypes = {
  headers: PropTypes.array,
  blocks: PropTypes.array,
  className: PropTypes.string,
  onChangeActive: PropTypes.func,
};

NavTab.defaultProps = {
  headers: [],
  blocks: [],
  className: "",
  onChangeActive: (index) => {},
};
