import "./style.scss";
import React, { useState, useEffect } from "react";

export const Expander = (props) => {
  const [active, setActive] = useState(
    props.className.search("active") !== -1 ? "" : "active"
  );
  const activeExpander = () => {
    const activeValue = active === "" ? "active" : "";
    setActive(activeValue);
  };
  useEffect(() => {
    activeExpander();
  }, [props.className]);
  return (
    <div className={`expander ${props.className}`}>
      <div className={`expander__title ${active}`}>
        <p className="title__name" onClick={activeExpander}>
          {props.title}
        </p>
        {props.overideRightComponent ? (
          props.overideRightComponent
        ) : (
          <div className="show-more-button">
            <div className="animated-button">
              <div className="bar bar1"></div>
              <div className="bar"></div>
            </div>
          </div>
        )}
      </div>
      <div className={`expander__content ${active}`}>
        <div className="expander__content-children">{props.children}</div>
      </div>
    </div>
  );
};
