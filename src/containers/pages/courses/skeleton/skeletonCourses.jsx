// @flow
import * as React from "react";
import "./style.scss";
export const SkeletonCourses = (props) => {
  const dataSet = new Array(props.limit).fill("");
  return (
    <div className={`skeleton-courses ${props.className}`}>
      {dataSet.map((item) => {
        return (
          <div className="skeleton-courses__item">
            <div className="item__image"></div>
            <div className="item__content">
              <div className="item__title"></div>
              <div className="item__cat"></div>
              <div className="item__btn"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
