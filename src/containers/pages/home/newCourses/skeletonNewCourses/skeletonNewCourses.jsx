// @flow
import React from "react";
import "./style.scss";
export const SkeletonNewCourses = (props) => {
  return (
    <div className="slt-new-courses">
      {dataSet.map(() => {
        return (
          <div className="slt-item">
            <div className="slt-item__header"></div>
            <div className="slt-item__body"></div>
                <div className="slt-item__footer">
                    <div className='footer__btn-price'></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const dataSet = new Array(3).fill("");
