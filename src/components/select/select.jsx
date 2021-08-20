import "./style.scss";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Select = ({
  defaultSelected,
  className,
  labelName,
  onChange,
  value,
  name,
  data,
}) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({
    value,
    text: value === -1 ? defaultSelected : data[value],
  });

  useEffect(() => {
    if (value === -1) {
      setSelected({
        ...selected,
        text: defaultSelected,
      });
    }
  }, [value]);

  useEffect(() => {
    setSelected({
      ...selected,
      text: defaultSelected,
    });
  }, [defaultSelected]);

  const dropDownFocus = () => {
    setShow(!show);
  };
  const dropDownSelected = (e) => {
    setSelected({
      ...selected,
      value: +e.target.getAttribute("data-id"),
      text: e.target.innerText,
    });
    setShow(!show);
    e.target.value = e.target.getAttribute("value");
    onChange(e);
  };
  return (
    <div className={`select ${className || ""}`}>
      <label htmlFor={`dropdown ${name}`} className="select__label">
        {labelName}
      </label>
      <div className="drop-down">
        <div
          className="drop-down__select"
          onClick={dropDownFocus}
          role="button"
          tabIndex={-100}
          id={`dropdown ${name}`}
        >
          <span>
            {selected.text}
          </span>
          <i className="fa fa-caret-down icon" />
        </div>
        <div className={`drop-down__list ${!show ? "Hidden" : ""}`}>
          {+data.length > 0 &&
            data.map((item, key) => (
              <div
                className={`drop-down__item ${
                  value === (item.id ? item.id : key) ? "active" : ""
                }`}
                onClick={dropDownSelected}
                role="button"
                tabIndex={key}
                data-id={key}
                value={item.id ? item.id : key}
              >
                {item.content ? item.content : item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  defaultSelected: PropTypes.string,
  className: PropTypes.string,
  labelName: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func,
  value: PropTypes.number,
};

Select.defaultProps = {
  defaultSelected: "",
  className: "",
  labelName: "",
  name: "",
  data: [],
  onChange: (e) => {},
  value: -1,
};
