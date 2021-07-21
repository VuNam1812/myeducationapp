import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';

export const Checkbox = ({ defaultChecked, className, id, checked }) => (
  <input id={id} type="checkbox" className={`checkbox ${className}`} defaultChecked={defaultChecked} checked={checked}/>
);

Checkbox.propTypes = {
  defaultChecked: PropTypes.bool,
};

Checkbox.defaultProps = {
  defaultChecked: false,
};
