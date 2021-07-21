import "./style.scss";
import { Input } from "../input/input";
import PropTypes from "prop-types";
import React from "react";
export const InputWithLabel = ({
  className,
  name,
  labelName,
  type,
  placeHolder,
  children,
  iconStyle,
  register,
  inputClassName,
  error,
  defauleValue,
  onBlur,
}) => {
  return (
    <div className={`input-with-label ${className}`}>
      <label className="input-with-label__label" htmlFor={`txt${name}`}>
        {labelName}
      </label>
      <Input
        className={inputClassName}
        iconStyle={iconStyle}
        type={type}
        name={name}
        placeHolder={placeHolder}
        register={register}
        id={`txt${name}`}
        error={error}
        onBlur={onBlur}
        defauleValue={defauleValue}
      />
      {children}
    </div>
  );
};

InputWithLabel.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  labelName: PropTypes.string,
  type: PropTypes.string.isRequired,
  iconStyle: PropTypes.object,
  value: PropTypes.string,
  children: PropTypes.element,
  placeHolder: PropTypes.string,
  onBlur: PropTypes.func,
  register: PropTypes.object,
};

InputWithLabel.defaultProps = {
  iconStyle: {},
  className: "",
  name: "",
  labelName: "",
  value: "",
  children: <></>,
  placeHolder: "",
  onBlur: () => {},
  register: {},
};
