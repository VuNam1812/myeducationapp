// @flow
import * as React from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import PropTypes from "prop-types";
import "./style.scss";
export const FieldText = ({
  type,
  className,
  placeHolder,
  format,
  label,
  onBlur,
  readOnly,
  error,
  register,
  name,
  defaultValue,
}) => {
  return (
    <div className={`field-text ${className}`}>
      {type === "date" ? (
        <>
          <DatePickerComponent
            className="field-text__date-time"
            value={defaultValue}
            format="dd-MM-yyyy"
            type={type}
            name={name}
            onBlur={onBlur}
            placeholder={placeHolder}
            readOnly={readOnly}
            {...register(name)}
          ></DatePickerComponent>
          <p className="field-text__label">{label}</p>
        </>
      ) : (
        <>
          <input
            className="field-text__input"
            defaultValue={defaultValue}
            type={type}
            name={name}
            onBlur={onBlur}
            placeholder={placeHolder}
            readOnly={readOnly}
            {...register(name)}
          ></input>
          <p className="field-text__label">{label}</p>
        </>
      )}
      {error.isShow && (
        <span className="field-text__error">{error.message}</span>
      )}
    </div>
  );
};

FieldText.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  error: PropTypes.objectOf({
    isShow: PropTypes.bool,
    message: PropTypes.string,
  }),
  name: PropTypes.string,
  register: PropTypes.func,
  defaultValue: PropTypes.string,
};

FieldText.defaultProps = {
  value: "",
  type: "",
  className: "",
  placeHolder: "",
  label: "",
  onChange: () => {},
  readOnly: false,
  error: {
    isShow: false,
    message: "",
  },
  name: "",
  register: () => {},
  defaultValue: "",
};
