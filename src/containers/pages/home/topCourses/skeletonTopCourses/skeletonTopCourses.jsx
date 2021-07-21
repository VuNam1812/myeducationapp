// @flow
import React from "react";
import "./style.scss";
export const SkeletonTopCourses = (props) => {
  return (
    <>
      {dataSet.map(() => {
        return (
          <div className="skeleton-top-courses__item">
            <div className="item-top-courses__image">
              <div className="image"></div>
            </div>
            <div className="item-top-courses__body">
              <div className="body-courses__title"></div>
              <div className="body-courses__cat"></div>
              <div className="body-courses__more"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const dataSet = new Array(5).fill("");
