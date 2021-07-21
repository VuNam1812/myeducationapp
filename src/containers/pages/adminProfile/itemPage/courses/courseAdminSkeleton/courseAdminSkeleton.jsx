// @flow
import * as React from "react";
import "./style.scss";
export const CourseAdminSkeleton = (props) => {
  return (
    <div className="course-admin-skeleton">
      {dataSet.map((item) => {
        return (
          <div className="course-admin-skeleton__item">
            <div className="course-admin-skeleton__item-image"></div>
            <div className="course-admin-skeleton__content">
              <div className="course-admin-skeleton__content-title"></div>
              <div className="course-admin-skeleton__content-cat"></div>
              <div className="course-admin-skeleton__content-info"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const dataSet = new Array(8).fill("");
