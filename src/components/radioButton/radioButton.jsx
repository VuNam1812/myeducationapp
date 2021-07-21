// @flow
import React, { useState, useEffect } from "react";
import { Checkbox } from "../checkbox/checkbox";
import "./style.scss";
export const RadioButton = (props) => {
  const [itemsRadio, setItemsRadios] = useState({});

  useEffect(() => {
    setNewArray(props.value);
   
  }, [props.value]);

  const setNewArray = (index) => {
    const items = new Array(props.items.length).fill(null).map(() => {
      return false;
    });
    if (index !== -1) {
      items[index] = true;
    }
    setItemsRadios(items);
  };

  const handleLoadRadioBtn = (e) => {
    const index = +e.currentTarget.getAttribute("data-id");
    setNewArray(index);
    e.target.value = index;
    props.onChange(e);
  };
  return (
    <div className={`radio-button ${props.className}`}>
      {props.items.map((item, index) => {
        return (
          <div
            data-id={index}
            className="radio-button__item"
            onClick={handleLoadRadioBtn}
          >
            <Checkbox
              id={`cb${index}`}
              className="checkbox-basic"
              checked={itemsRadio[index]}
            ></Checkbox>
            <label htmlFor={`cb${index}`} className="radio-button__item-text">
              {item}
            </label>
          </div>
        );
      })}
    </div>
  );
};
