// @flow 
import * as React from 'react';
import './style.scss';
export const Background = (props) => {
    return (
      <div className={`background ${props.className}`}>
        <div className='square'></div>
        <div className='square'></div>
        <div className='square'></div>
      </div>
    );
};