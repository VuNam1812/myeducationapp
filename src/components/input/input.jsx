import "./style.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
const iconStylePassword = ["eye", "eye-slash"];

export const Input = ({
  className,
  type,
  placeHolder,
  iconStyle,
  defauleValue,
  name,
  error,
  register,
  onBlur,
}) => {
  const [Type, setType] = useState(type);
  const flag = type === "password";
  /*{typeof iconStyle === 'object' && (
    <i
      className={`input__right-icon fa fa-${iconStyle.icon}`}
      style={iconStyle.style}
      aria-hidden="true"
    />
  )}*/
  const switchType = () => {
    setType(Type === "password" ? "text" : "password");
  };
  return (
    <div className={`input ${className}`}>
      <div className="main-content">
        <input
          className="input__text"
          defaultValue={defauleValue}
          type={`${Type}`}
          placeholder={placeHolder}
          onBlur={onBlur}
          name={name}
          id={`txt${name}`}
          {...register(name, { valueAsNumber: type === "number" })}
        />
      </div>
      {flag && (
        <div className="option-content">
          <i
            className={`input__right-icon fa fa-${
              iconStylePassword[Type === "password" ? 1 : 0]
            }`}
            aria-hidden="true"
            onClick={switchType}
          />
        </div>
      )}
      {error.isShow && <span className="input__error">{error.message}</span>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeHolder: PropTypes.string,
  iconStyle: PropTypes.objectOf({
    icon: PropTypes.string,
    style: PropTypes.object,
  }),
  name: PropTypes.string,
  error: PropTypes.objectOf({
    isShow: PropTypes.bool,
    message: PropTypes.string,
  }),
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  value: "",
  placeHolder: "",
  iconStyle: {},
  name: "",
  error: { isShow: false, message: "" },
  onBlur: () => {},
};
